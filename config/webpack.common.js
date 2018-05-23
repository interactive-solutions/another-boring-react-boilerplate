const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const DotenvWebpackPlugin = require('dotenv-webpack');
const LodashWebpackPlugin = require('lodash-webpack-plugin');
const autoprefixer = require('autoprefixer');

const projectRoot = path.resolve(__dirname, '..'); // Project root

const isHot = process.argv.indexOf('--hot') !== -1;

module.exports = {
  resolve: {
    modules: ['node_modules', 'src'],
  },
  entry: {
    main: ['./src/main.js'], // This is an array because we want to be able to add HMR in dev config
  },
  output: {
    path: path.resolve(projectRoot, 'dist'),
    filename: '[name].js',
    sourceMapFilename: '[file].map',
    chunkFilename: '[name].js',
    publicPath: '/',
  },
  optimization: {
    // This is based on the default optimization settings, but with a few modifications in order to
    // get a vendor, common and styles bundle
    splitChunks: {
      chunks: 'all',
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      automaticNameDelimiter: '-',
      name: true,
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          name: 'vendor',
        },
        default: {
          minSize: 500,
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
          name: 'common',
        },
        styles: {
          name: 'styles',
          test: /\.(css|scss)$/,
          chunks: 'all',
          enforce: true,
        },
      },
    },
    runtimeChunk: {
      // Make manifest its own chunk
      name: 'manifest',
    },
  },
  module: {
    rules: [
      {
        // CSS/SCSS loader
        test: /\.s?css$/,
        exclude: /node_modules/,
        use: [
          // Use style-loader with HMR, otherwise use MiniCssExtractPlugin
          isHot ? 'style-loader' : MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader', // Load css and turn into modules
            options: {
              modules: true,
              localIdentName: '_[hash:base64:5]',
              sourceMap: true,
            },
          },
          {
            loader: 'postcss-loader', // Used to add autoprefixes
            options: {
              sourceMap: true,
              plugins: () =>
                autoprefixer({
                  browsers: ['last 5 versions'],
                }),
            },
          },
          'sass-loader', // Used to parse SCSS
          {
            loader: 'sass-resources-loader', // Used to inject SCSS variables from css/resources, thus making them "global"
            options: {
              resources: './src/css/resources/_*.scss',
              sourceMap: true,
            },
          },
        ],
      },
      // Use babel-loader for js
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(jpg|png|svg|ttf|woff|woff2|eot)$/,
        use: {
          loader: 'url-loader', // url-loader for assets, will fallback to file-loader > 5k
          options: {
            limit: 5000,
            name: './images/[hash].[ext]',
          },
        },
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name]-[contenthash:20].css',
      chunkFilename: '[name]-[contenthash:20].css',
    }),
    new HtmlWebpackPlugin({
      // Create a html with the build files from template
      template: './src/index.html',
    }),
    new DotenvWebpackPlugin(),
    new webpack.HashedModuleIdsPlugin(), // So vendor caching works correctly
    new LodashWebpackPlugin(),
  ],
  node: {
    fs: 'empty',
  },
};
