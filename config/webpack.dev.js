const merge = require('webpack-merge');

const common = require('./webpack.common.js');

const isHot = process.argv.indexOf('--hot') !== -1;

const config = merge(common, {
  mode: 'development',
  devServer: {
    historyApiFallback: true,
    compress: true,
    disableHostCheck: true,
  },
});

// Add HMR as entry if enabled
if (isHot) {
  config.entry.main.unshift('react-hot-loader/patch');
}

module.exports = config;
