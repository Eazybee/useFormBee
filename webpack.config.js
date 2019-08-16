const webpackMerge = require('webpack-merge');
const commonConfig = require('./webpack/common');

module.exports = env => {
  let envConfig;
  !env.mode
    ? (envConfig = require(`./webpack/development`))
    : (envConfig = require(`./webpack/${env.mode}`))

  console.log(env);
  return webpackMerge({ mode: env.mode }, commonConfig, envConfig);
};
