const DotenvWebpackPlugin = require('dotenv-webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackInlineSVGPlugin = require('html-webpack-inline-svg-plugin');
svgToMiniDataURI = require('mini-svg-data-uri');
const path = require('path');

module.exports = {
  entry: ['@babel/polyfill', './src/index.js'],
  output: {
    filename: 'main.js',
    path: path.join(__dirname, 'dist'),
    publicPath: '/',
  },
  resolve: {
    fallback: {
      path: require.resolve('path-browserify'),
    },
    alias: {
      assets: path.resolve(__dirname, 'assets/'),
      src: path.resolve(__dirname, 'src'),
    },
  },
  module: {
    rules: [
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
            options: { minimize: true },
          },
        ],
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(png|gif|jpg|jpeg|woff|woff2|eot|ttf|svg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 100000,
            },
          },
        ],
      },
      {
        test: /\.svg$/,
        use: {
          loader: 'svg-url-loader',
          options: {},
        },
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html',
      filename: './index.html',
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css',
    }),
    new DotenvWebpackPlugin(),
    // new HtmlWebpackInlineSVGPlugin(),
  ],
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    historyApiFallback: true,
    compress: true,
    open: true,
  },
};
