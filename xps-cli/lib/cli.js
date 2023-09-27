#!/usr/bin/env node

import chalk from 'chalk';
import boxen from 'boxen';
import arg from 'arg';
import path from 'path';
import fs from 'fs';
import inquirer from 'inquirer';
import createTemplate from './template-creator';

const greeting = chalk.white.bold('BREVILLE CLI');

const boxenOptions = {
    padding: 1,
    margin: 1,
    borderStyle: 'round',
    borderColor: 'green',
    backgroundColor: '#555555',
};
const msgBox = boxen(greeting, boxenOptions);

console.info(msgBox);

/**
 * This method is responsible for parsing the args passed by user
 * @param {Object} rawArgs argument in object
 * @returns {*}
 */
function parseArguments(rawArgs) {
    const argv = rawArgs.slice(2);
    const args = arg(
        {
            '--build': Boolean,
            '--init': Boolean,
            '--help': Boolean,
            '--component': Boolean,
            '--ui': Boolean,
            '--container': Boolean,
            '--store': Boolean,
            '--saga': Boolean,
            '-H': '--help',
        },
        {
            argv,
        },
    );

    const currentCommand = Object.keys(args).find((each) => each !== '_');

    return {
        initialize: Boolean(args['--init']),
        build: Boolean(args['--build']),
        help: Boolean(args['--help']),
        component: Boolean(args['--component']),
        ui: Boolean(args['--ui']),
        container: Boolean(args['--container']),
        store: Boolean(args['--store']),
        saga: Boolean(args['--saga']),
        template: args._[0],
        currentCommand,
        argv,
    };
}

async function promptForMissingOptions(options) {
    const questions = [];
    const { build, help, currentCommand } = options;
    const isTemplate = !build && !help;

    options.templateCreator = isTemplate;

    let answers = {};
    const actionMap = {
        Component: '--component',
        Container: '--container',
        Store: '--store',
        Saga: '--saga',
    };

    const dirMapping = {
        '--component': { source: 'components', destination: 'components', template: 'component' },
        '--ui': { source: 'components', destination: 'ui', template: 'component' },
        '--container': { source: 'containers', destination: 'conatiners', template: 'container' },
        '--store': { source: 'store', destination: 'library/store', template: 'store' },
        '--saga': { source: 'saga', destination: 'library/saga', template: 'saga' },
    };

    if (isTemplate) {
        // This is for direct command
        options.config = dirMapping[currentCommand] || {};
        options.config.dirName = options.template;

        // This is for list selections
        if (!options.template && !options.build) {
            questions.push({
                type: 'list',
                name: 'template',
                message: 'Please choose template you want to create.',
                choices: ['Component', 'Container', 'Store', 'Saga', 'Build'],
            });

            questions.push({
                type: 'input',
                name: 'dirName',
                message: 'Please enter name of the file',
            });

            answers = await inquirer.prompt(questions);

            const action = actionMap[answers.template];
            const currentConfig = dirMapping[action] || {};

            options.config = currentConfig;
            options.config.dirName = answers.dirName;
            options[currentConfig.template] = true;
            options.templateCreator = true;
        }
    }

    return {
        ...options,
        template: options.template || answers.template,
    };
}

async function cli(args) {
    let options = parseArguments(args);

    options = await promptForMissingOptions(options);

    try {
        if (options.templateCreator) {
            await createTemplate(options);
            console.info(chalk.green.bold('✅ Done'));
        }
    } catch (error) {
        console.error(error);
    }

    if (options.help) {
        const currentFileUrl = import.meta.url;

        const readMePath = path.resolve(new URL(currentFileUrl).pathname, '../../README.md');
        const doc = fs.readFileSync(readMePath, { encoding: 'utf8' });

        console.info(doc);
    }
}

export default cli;
