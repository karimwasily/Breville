import chalk from 'chalk';
import fs from 'fs';
import ncp from 'ncp';
import path from 'path';
import { promisify } from 'util';

const access = promisify(fs.access);
const copy = promisify(ncp);
const lineSytle = process.platform === "win32" ? '\r\n' : '\n';

/**
 * This method converts filename to pascal case
 * @param {String} fileName name of file
 * @returns {String}
 */
const getComponentName = (fileName) => {
    if (typeof fileName !== 'string') return '';

    return fileName
        .split('-')
        .map((e) => e.charAt(0).toUpperCase() + e.slice(1))
        .join('');
};

/**
 * This method converts filename to camel case
 * @param {String} filename name of file
 * @returns {String}
 */
const toCamelCase = (filename) => {
    return filename
        .split('-')
        .map(function (word, index) {
            if (index === 0) return word.toLowerCase();

            return `${word.charAt(0).toUpperCase()}${word.slice(1).toLowerCase()}`;
        })
        .join('');
};

/**
 * This method will register new reducer to rootReducer
 * @param {String} fileName name of file to be imported
 * @param {String} sliceName name of slice to be registered
 */
const processRootReducer = ({ filename, sliceName, targetDir, destination }) => {
    const data = fs.readFileSync(`${targetDir}/src/main/webpack/${destination}/rootReducer.js`, { encoding: 'utf8' });
    const uiImport = "import { reducer as ui } from './ui/reducer';";
    const reducerExport = 'export default combineReducers( {';
    const currentImport = `import { reducer as ${sliceName} } from './${filename}/reducer';`;

    let normalizedData = data.replace(reducerExport, `${reducerExport}${lineSytle}\t${sliceName},`);

    normalizedData = normalizedData.replace(uiImport, `${uiImport}${lineSytle}${currentImport}`);

    fs.writeFileSync(`${targetDir}/src/main/webpack/${destination}/rootReducer.js`, normalizedData);
};

/**
 * This method will register new reducer to rootReducer
 * @param {String} fileName name of file to be imported
 * @param {String} sliceName name of slice to be registered
 */
const processRootSaga = ({ filename, sliceName, targetDir, destination }) => {
    const rootSaga = `${targetDir}/src/main/webpack/${destination}/index.js`;
    const data = fs.readFileSync(rootSaga, { encoding: 'utf8' });
    const sagaImport = "import { all, call } from 'redux-saga/effects';";
    const sagaExport = 'yield all( [';

    let normalizedData = data.replace(sagaExport, `${sagaExport}${lineSytle}\t\t\tcall(${sliceName}),`);

    normalizedData = normalizedData.replace(
        sagaImport,
        `${sagaImport}${lineSytle}import ${sliceName} from 'library/saga/${filename}';`,
    );

    fs.writeFileSync(rootSaga, normalizedData);
};

/**
 * This method generates the css selector name based on component name
 * @param {String} compName name of the component
 * @returns {String}
 */
const getComponentSelector = (compName) => compName.charAt(0).toLowerCase() + compName.slice(1);

/**
 * This method is responsible for copying the file based on the template options
 * @param {*} options list of options
 */
async function copyTemplateFiles(options) {
    const {
        config: { dirName, destination, template },
        targetDir,
        templateDir,
    } = options;
    const dirPath = `${targetDir}/src/main/webpack/${destination}/${dirName}`;
    const filename = dirName.split('/').pop();
    const compName = getComponentName(filename);
    const compSelector = getComponentSelector(compName);
    const sliceName = toCamelCase(filename);
    const nameSpace = filename.replace(/-/g, '_').toUpperCase();

    if (template === 'store') processRootReducer({ filename, sliceName, targetDir, destination });
    if (template === 'saga') processRootSaga({ filename, sliceName, targetDir, destination });

    fs.mkdirSync(dirPath, { recursive: true });

    return copy(templateDir, dirPath, {
        clobber: false,
        transform: function (read, write) {
            write.on('finish', function () {
                const writePath = write.path;

                if (writePath.includes('component-template')) {
                    const newPath = writePath.replace('component-template', filename);

                    fs.renameSync(writePath, newPath);
                }
            });

            read.on('data', function (chunk) {
                const chunkData = chunk.toString('utf8');

                let normalized = chunkData.replace(/\$COMP_NAME/gi, compName);

                normalized = normalized.replace(/\$comp-name/gi, filename);
                normalized = normalized.replace(/\$compClass/gi, `.${compSelector}`);
                normalized = normalized.replace(/\$NAMESPACE/gi, `${nameSpace}`);
                normalized = normalized.replace(/\$SLICE/gi, `${sliceName}`);
                write.write(normalized);
            }).on('end', () => {
                // closing write stream
                write.destroy();
                write.end();
            });
        },
    });
}

/**
 * This method is entry point for the template creation
 * @param {*} options list of options
 */
export async function createTemplate(options) {
    options = {
        ...options,
        targetDir: options.targetDir || process.cwd(),
    };

    // const currentFileUrl = import.meta.url;
    const {
        config: { source },
    } = options;

    const templateDir = path.resolve(__dirname, '../templates', source);
    options.templateDir = templateDir;
    try {
        await access(templateDir, fs.constants.R_OK);
    } catch (err) {
        console.error('%s Invalid template name', chalk.red.bold('ERROR'));
        console.error(err);
        process.exit(1);
    }
    await copyTemplateFiles(options);
}

export default createTemplate;
