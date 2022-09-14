// base url sestting
// Why is my vue.config.js proxy not working?
// https://stackoverflow.com/questions/56419057/why-is-my-vue-config-js-proxy-not-working
// devServer proxy(in vue.config.js) not working
// https://forum.vuejs.org/t/devserver-proxy-in-vue-config-js-not-working/87316/5
module.exports = {
  configureWebpack: {
    devServer: {
      proxy: {
        "^/api": {
          target: "http://localhost:8800",
          ws: true,
          changrigin: true,
          pathRewrite: {
            "^/api": "/api",
          },
        },
      },
    },
  },
};
