// vue.config.js
module.exports = {
  filenameHashing: false,
  outputDir:
    "../ui.apps/src/main/content/jcr_root/apps/breville-brands/clientlibs/clientlib-coffeehub-vue/js",
  configureWebpack: config => {
    config.optimization = {
      minimize: true
    };
    config.devServer = {
      public: "localhost:9080",
      port: 9080,
      proxy: {
        "^/api/": {
          target: "http://localhost:3004/",
          secure: false,
          pathRewrite: {
            "/api/*": "/"
          }
        },
        "^/": {
          target: 'http://localhost:4502',
          context: ['/content', '/etc.clientlibs'],
        }
      }
    };
  },
  css: {
    extract: false
  }
};
