exports.config = {
  serviceWorker: {
    globPatterns: ["**/*.{js,css,html,png,jpg}"]
  },
  bundles: [{ components: ["turn-touch", "my-app"] }]
};

exports.devServer = {
  root: "www",
  watchGlob: "**/**"
};
