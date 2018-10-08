const path = require('path');
var webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

var sitename = 'thetalentboom';

module.exports = {
  entry: {
    bundle: './app/index.js',
    mapscript: './app/mapscript.js',
    jobsearch: './app/jobsearch.js'
  },
  output: {
    filename: '[name].min.js',
    path: path.resolve(__dirname, 'dist')
  },
  resolve: {
    extensions: ['.js']
  },
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist'
  },
  optimization: {
    minimizer: [
      new UglifyJsPlugin({})
    ]
  },
  module: {
    rules: [ 
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'postcss-loader']
        })
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {loader: 'css-loader', options: {sourceMap: true}},
            {loader: 'postcss-loader', options: {sourceMap: true}},
            {loader: 'sass-loader', options: {sourceMap: true}}
          ]
        }),
        exclude: /node_modules/
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'img/'
            }
          }
        ]
      },
      {
        test: /\.(png|jp(e*)g|svg)$/,  
        use: [
          {
            loader: 'url-loader',
            options: { 
              limit: 8000, // Convert images < 8kb to base64 strings
              name: 'img/[name].[ext]'
            } 
          }
        ]
      }
    ]
  },
  plugins: [
    new BundleAnalyzerPlugin(),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery'
    }),
    new CleanWebpackPlugin(['dist']),
    new ExtractTextPlugin('styles.min.css'),
    new BrowserSyncPlugin(
      {
        proxy: 'http://localhost:85/' + sitename,
      }
    )
  ]
};