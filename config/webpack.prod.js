const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const merge = require('webpack-merge');
const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin');
const FileManagerPlugin = require('filemanager-webpack-plugin');
const SentryWebpackPlugin = require('@sentry/webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

const common = require('./webpack.common.js');

const projectRoot = path.resolve(__dirname, '..');

module.exports = merge(common, {
  mode: 'production',
  devtool: 'source-map', // Add source maps
  output: {
    // Add chunkhash to file names in prod
    filename: '[name]-[chunkhash].js',
    chunkFilename: '[name]-[chunkhash].js',
    // ... also, put build files in static/build
    path: path.resolve(projectRoot, 'dist', 'static', 'build'),
    publicPath: '/static/build/',
  },
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        uglifyOptions: {
          parse: {
            ecma: 8,
          },
          compress: {
            ecma: 5,
            warnings: false,
            comparisons: false,
          },
          mangle: {
            safari10: true,
          },
          output: {
            ecma: 5,
            comments: false,
            ascii_only: true,
          },
        },
        parallel: true,
        cache: true,
        sourceMap: true,
      }),
      new OptimizeCssAssetsPlugin(),
    ],
  },
  plugins: [
    new SentryWebpackPlugin({
      release: process.env.SENTRY_BUILD ? process.env.SENTRY_BUILD : 'local',
      include: './dist',
      ignore: ['node_modules'],
    }),
    // Clean /dist onStart and move index.html to root onEnd
    new FileManagerPlugin({
      onStart: {
        delete: ['./dist'],
      },
      onEnd: {
        move: [{ source: './dist/static/build/index.html', destination: './dist/index.html' }],
      },
    }),
    // Generate service worker
    new SWPrecacheWebpackPlugin({
      cacheId: 'abrb-sw',
      filepath: path.resolve(projectRoot, 'dist', 'sw.js'),
      minify: true,
      // Remove local path prefixes
      stripPrefix: `${process.cwd()}/dist`,
      // Ignore index.html
      staticFileGlobsIgnorePatterns: [/build\/index\.html$/, /\.map$/],
      // Do not cache bust files with chunkhash
      dontCacheBustUrlsMatching: /-\w{20}/,
    }),
    // Create a bundle analyzer report
    new BundleAnalyzerPlugin({
      analyzerMode: 'static',
      reportFilename: '../../../report.html',
      openAnalyzer: false,
    }),
  ],
  performance: {
    hints: 'warning',
    maxAssetSize: 1000000,
    maxEntrypointSize: 1000000,
  },
});
