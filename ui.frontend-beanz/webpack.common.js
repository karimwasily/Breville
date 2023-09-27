'use strict';

const path = require( 'path' );
const webpack = require( 'webpack' );
const MiniCssExtractPlugin = require( 'mini-css-extract-plugin' );
const CopyWebpackPlugin = require( 'copy-webpack-plugin' );
const { CleanWebpackPlugin } = require( 'clean-webpack-plugin' );

const SOURCE_ROOT = `${ __dirname }/src/main/webpack`;

module.exports = {
  resolve: {
    extensions: [ '.js', '.ts' ]
  },
  entry: {
    site: `${ SOURCE_ROOT }/main.ts`
  },
  output: {
    filename: ( chunkData ) => {

      return chunkData.chunk.name === 'dependencies' ? 'clientlib-beanz-dependencies/[name].js' : 'clientlib-beanz-site/[name].js';

    },
    path: path.resolve( __dirname, 'dist' )
  },
  module: {
    rules: [
      {
        test: /\.svg$/,
        use: [
          {
            loader: 'babel-loader'
          },
          {
            loader: 'react-svg-loader',
            options: {
              jsx: true,
              svgo: {
                plugins: [
                  { cleanupAttrs: false },
                  { inlineStyles: true },
                  { minifyStyles: true },
                  { convertStyleToAttrs: true },
                  { cleanupIDs: true },
                  { cleanupNumericValues: true },
                  { convertColors: true },
                  { cleanupEnableBackground: true },
                  { convertShapeToPath: true },
                  { moveElemsAttrsToGroup: true },
                  { moveGroupAttrsToElems: true },
                  { collapseGroups: false },
                  { convertPathData: true },
                  { convertTransform: true },
                  { mergePaths: true }
                ],
                floatPrecision: 2
              }
            }
          }
        ]
      },
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: [
          {
            options: {
              eslintPath: require.resolve( 'eslint' )
            },
            loader: require.resolve( 'eslint-loader' )
          },
          {
            loader: 'webpack-import-glob-loader',
            options: {
              url: false
            }
          }
        ]
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        include: [
          path.resolve( __dirname, 'src' ),
          path.resolve( __dirname, '../xps-react' ),
          path.resolve( __dirname, '../xps-utils' )
        ],
        loader: [ 'babel-loader' ]
      },
      {
        test: /\.(s?)css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              url: false
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins() {
                return [
                  require( 'autoprefixer' )
                ];
              }
            }
          },
          {
            loader: 'sass-loader'
          },
          {
            loader: 'webpack-import-glob-loader',
            options: {
              url: false
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new webpack.ProvidePlugin( {
      $: 'jquery',
      jQuery: 'jquery'
    } ),
    new CleanWebpackPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new MiniCssExtractPlugin( {
      filename: 'clientlib-beanz-[name]/[name].css'
    } ),
    new CopyWebpackPlugin( [
      { from: path.resolve( __dirname, `${ SOURCE_ROOT }/resources` ), to: './clientlib-beanz-site/' },
      {
        context: '../ui.apps/src/main/content/jcr_root/apps/breville-brands/i18n/',
        from: '**/*.json',
        to: './clientlib-site/i18n'
      }
    ] )
  ],
  stats: {
    assetsSort: 'chunks',
    builtAt: true,
    children: false,
    chunkGroups: true,
    chunkOrigins: true,
    colors: false,
    errors: true,
    errorDetails: true,
    env: true,
    modules: false,
    performance: true,
    providedExports: false,
    source: false,
    warnings: true
  }
};
