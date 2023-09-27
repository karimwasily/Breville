const merge = require( 'webpack-merge' );
const common = require( './webpack.common.js' );
const path = require( 'path' );
const HtmlWebpackPlugin = require( 'html-webpack-plugin' );

const SOURCE_ROOT = `${ __dirname }/src/main/webpack`;

module.exports = ( env ) => {
  const writeToDisk = env && Boolean( env.writeToDisk );
  const fileMap = {
    CHECKOUT: '/static/checkout.html',
    CART: '/static/cart.html',
    ORDER: '/static/order-confirmation.html',
    CL: '/static/coffee-landing.html',
    SL: '/static/solution-landing.html',
    PLP: '/static/plp.html',
    COMPARE: '/static/product-compare.html',
    HEADER: '/static/header.html',
    FOOTER: '/static/footer.html',
    SEARCH: '/static/search-results.html',
    BANNERS: '/static/banners.html',
    AR: '/static/ar.html',
    PDP: '/static/pdp.html',
    PDPARCHIVE: '/static/pdp-archive.html',
    BUNDLE: '/static/bundle.html',
    BEANZ: '/static/beanz.html',
    EXPERIENCE: '/static/experience.html',
    MYBREVILLE: '/static/mybreville.html',
    MYBREVILLE_SUPPORT: '/static/mybreville-support.html',
    DEFAULT: '/static/index.html'
  };

  const currentFile = fileMap[process.env.APP_VIEW] || fileMap['DEFAULT'];

  return merge( common, {
    mode: 'development',
    devtool: 'inline-source-map',
    performance: { hints: 'warning' },
    plugins: [
      new HtmlWebpackPlugin( {
        template: path.resolve( __dirname, SOURCE_ROOT + currentFile )
      } )
    ],
    resolve: {
      // during development we may have dependencies which are linked in node_modules using either `npm link`
      // or `npm install <file dir>`. Those dependencies will bring *all* their dependencies along, because
      // in that case npm ignores the "devDependencies" setting.
      // In that case, we need to make sure that this project using its own version of React libraries.

      alias: {
        react: path.resolve( './node_modules/react' ),
        'react-dom': path.resolve( './node_modules/react-dom' ),
        'react-i18next': path.resolve( './node_modules/react-i18next' )
      }
    },
    devServer: {
      historyApiFallback: true,
      inline: true,
      proxy: [{
        context: ['/content', '/etc.clientlibs', '/api/graphql'],
        target: 'http://localhost:4502',
        secure: false,
        headers: {
          Connection: 'keep-alive'
        }
      }],
      writeToDisk,
      liveReload: !writeToDisk,
      contentBase: path.resolve( './src/main/webpack/resources' ),
      contentBasePublicPath: '^/resources'
    }
  } );
};
