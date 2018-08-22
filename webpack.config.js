/*!
 * Webpack config
 * xiewulong <xiewulong@vip.qq.com>
 * create: 2018/07/19
 * since: 0.0.1
 */
'use strict';

const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const WebpackHtmlPlugin = require('html-webpack-plugin');
const WebpackMiniCssExtractPlugin = require('mini-css-extract-plugin');
const WebpackOptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const WebpackUglifyjsPlugin = require('uglifyjs-webpack-plugin');
const pkg = require('./package.json');

const base_path = __dirname;
const entry_path = `${base_path}/assets/javascripts`;
const output_path = `${base_path}/public/js`;
const page_path = `${base_path}/views`;

let entries = {};
fs.readdirSync(entry_path).forEach(filename => {
  if (!fs.statSync(`${entry_path}/${filename}`).isFile()) return;

  let name = path.parse(filename).name;
  entries[name] = `${entry_path}/${name}`;
});

let pages = [];
fs.readdirSync(page_path).forEach(filename => {
  if (!fs.statSync(`${page_path}/${filename}`).isFile()) return;

  let name = path.parse(filename).name;
  if (!/\.html$/.test(name)) return;

  pages.push(new WebpackHtmlPlugin({
    title: {
      author: pkg.author,
      description: pkg.description,
      keywords: pkg.keywords.join(', '),
      version: pkg.version,
    },
    template: `${page_path}/${name}.pug`,
    filename: `../${name}`,
    inject: false,
  }));
});

module.exports = {
  entry: entries,
  output: {
    path: output_path,
    filename: '[name].js',
  },
  resolve: {
    alias: {
      // 'vue$': `vue/dist/vue.common.js`,
    },
    // extensions: [ '.js', '.web.js', '.webpack.js' ],
  },
  externals: {
    jquery: 'jQuery',
  },
  module: {
    rules: [
      {
        test: /\.pug$/,
        use: [
          {
            loader: 'pug-loader',
            options: {
              pretty: true,
            },
          },
        ],
      },
      {
        test: /\.css$/,
        use: [
          WebpackMiniCssExtractPlugin.loader,
          'css-loader?sourceMap',
          'postcss-loader?sourceMap',
        ],
      },
      {
        test: /\.scss$/,
        use: [
          WebpackMiniCssExtractPlugin.loader,
          'css-loader?sourceMap',
          'postcss-loader?sourceMap',
          'sass-loader?sourceMap',
        ],
      },
      {
        test: /\.js?$/,
        use: [ 'babel-loader' ],
        exclude: /node_modules/,
      },
      {
        test: /\.(gif|jpe?g|png)(\?.*)?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              fallback: 'file-loader',
              limit: 8192,
              name: '../images/[name].[ext]',
            },
          },
        ],
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              fallback: 'file-loader',
              limit: 8192,
              name: '../fonts/[name].[ext]',
            },
          },
        ],
      },
    ],
  },
  optimization: {
    minimizer: [
      new WebpackUglifyjsPlugin({
        uglifyOptions: {
          output: { comments: false },
          ie8: true,
        },
      }),
      new WebpackOptimizeCSSAssetsPlugin({
        cssProcessorOptions: { discardComments: { removeAll: true } },
      }),
    ],
    splitChunks: {
      cacheGroups: {
        common: {
          chunks: 'all',
          minChunks: 2,
          minSize: 1,
          name: 'common',
        },
      },
    },
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new WebpackMiniCssExtractPlugin({ filename: '../css/[name].css' }),
  ].concat(pages),
};
