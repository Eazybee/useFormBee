const ErrorOverlayPlugin = require('error-overlay-webpack-plugin');

module.exports = {
  devServer: {
    historyApiFallback: true,
    port: 8000
  },
  plugins: [new ErrorOverlayPlugin()],
};
