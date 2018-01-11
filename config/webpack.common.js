const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');

const projectRoot = path.resolve(__dirname, '..'); // Project root

module.exports = {
  entry: {
    main: './src/index.js',
  },
  output: {
    path: path.resolve(projectRoot, 'dist'),
    filename: '[name].js',
    chunkFilename: '[name].js',
    publicPath: '/',
  },
  module: {
    rules: [
      {
        // CSS/SCSS loader
        test: /\.s?css$/,
        exclude: /node_modules/,
        use: ExtractTextWebpackPlugin.extract({
          // Use ETWP to put CSS in its own file
          use: [
            {
              loader: 'css-loader', // Load css and turn into modules
              options: {
                modules: true,
                localIdentName: '_[hash:base64:5]',
              },
            },
            {
              loader: 'postcss-loader', // Used to add autoprefixes
              options: {
                plugins: () =>
                  autoprefixer({
                    browsers: ['last 5 versions'],
                  }),
              },
            },
            'sass-loader', // Used to parse SCSS
            {
              loader: 'sass-resources-loader', // Used to inject SCSS variables, thus making them "global"
              options: {
                resources: './src/css/resources/_*.scss',
              },
            },
          ],
        }),
      },
      // Use babel-loader for js
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      // Create a html with the build files from template
      template: './src/index.html',
    }),
    new CopyWebpackPlugin([{ from: './src/assets', to: '../' }]), // Copy static resources to build directory
    // Extract loaded CSS and save to a file
    new ExtractTextWebpackPlugin({
      filename: 'style-[contenthash:20].css',
      allChunks: true,
    }),
    new webpack.HashedModuleIdsPlugin(), // So vendor caching works correctly
    // Extract commonly used components to main bundle
    new webpack.optimize.CommonsChunkPlugin({
      name: 'main',
      children: true,
      minChunks: 2,
    }),
    // Bundle vendor libraries
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks(module) {
        return module.context && module.context.indexOf('node_modules') >= 0;
      },
    }),
    // Extract manifest
    new webpack.optimize.CommonsChunkPlugin({ name: 'manifest', minChunks: Infinity }),
  ],
  node: {
    fs: 'empty',
  },
};
