const { injectBabelPlugin } = require("react-app-rewired");

module.exports = function override(config, env) {
  // Prevent all of the grommet-icons library being included:
  config = injectBabelPlugin("babel-plugin-grommet", config);
  // Only include the used functions from lodash and recompose:
  config = injectBabelPlugin(
    ["babel-plugin-lodash", { id: ["lodash", "recompose"] }],
    config
  );
  return config;
};
