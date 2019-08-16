const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = {
  devtool: 'source-map',
  performance: {
    hints: false,
  },
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        cache: true,
        parallel: true,
      }),
      new OptimizeCSSAssetsPlugin({})
    ]
  },
};
