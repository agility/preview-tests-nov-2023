const path = require("path");
const { default: css } = require("styled-jsx/css");

module.exports = {
  webpack(config) {
    config.resolve.alias["@"] = path.join(__dirname, "app");
    return config;
  },

  experimantal: {
    css: true,
  },
};
