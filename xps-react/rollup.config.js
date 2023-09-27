import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs'
import scss from 'rollup-plugin-scss';
import resolve from 'rollup-plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';
import React from 'react';
import reactDom from 'react-dom';
import PropTypes from 'prop-types';

export default {
    input: 'framer-core/index.js',
    external: ["react", "react/jsx-runtime", "react-dom", "framer", "framer-motion"],
    output: {
        dir: './dist',
        format: 'esm',
        sourcemap: 'inline',
        preserveModules: true,
        preserveModulesRoot: 'framer-core',
    },
    plugins: [
        babel({
            exclude: 'node_modules/**',
            extensions: ['.js', '.jsx', '.ts', '.tsx']
        }),
        resolve(),
        commonjs({
            include: /node_modules/,
            namedExports: {
                'react': Object.keys(React),
                'react-dom': Object.keys(reactDom),
                'prop-types': Object.keys(PropTypes),
            }        
        }),
        terser(),
        scss({output: 'dist/main.css', sourceMap: true})
    ]
}