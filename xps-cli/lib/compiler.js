#!/usr/bin/env node

const chalk = require('chalk');
const boxen = require('boxen');
const rollup = require('rollup');
const path = require('path');
const resolve = require('@rollup/plugin-node-resolve').default;
const babel = require('@rollup/plugin-babel').default;
const { terser } = require('rollup-plugin-terser');

const greeting = chalk.white.bold('Running breville builder..');

const boxenOptions = {
    padding: 1,
    margin: 1,
    borderStyle: 'round',
    borderColor: 'green',
    backgroundColor: '#555555',
};
const msgBox = boxen(greeting, boxenOptions);

console.info(msgBox);

const currentWorkingPath = process.cwd();
const { main, name } = require(path.join(currentWorkingPath, 'package.json'));

const inputPath = path.join(currentWorkingPath, main);

// Little workaround to get package name without scope
const fileName = name.replace('@breville/', '');

// see below for details on the options
const inputOptions = {
    input: inputPath,
    external: ['react'],
    plugins: [
        resolve(),
        babel({
            presets: ['@babel/preset-env', '@babel/preset-react'],
            babelHelpers: 'bundled',
        }),
    ],
};

const outputOptions = [
    {
        file: `dist/${fileName}.cjs.js`,
        format: 'cjs',
        exports: 'named',
        plugins: [terser()],
    },
    {
        dir: `dist`,
        format: 'esm',
        exports: 'named',
        preserveModules: true,
    },
];

async function build() {
    // create bundle
    const bundle = await rollup.rollup(inputOptions);

    // loop through the options and write individual bundles

    outputOptions.forEach(async (options) => {
        await bundle.write(options);
    });
}

module.exports = { build };
