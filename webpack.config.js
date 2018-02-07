const dotenv = require('dotenv');

try {
  dotenv.config();
} catch (e) {
  console.log('no .env file found, skipping dotenv'); // eslint-disable-line no-console
}

const webpack = require('webpack');
const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');

const nodeEnv = process.env.NODE_ENV || 'production';
const isProduction = nodeEnv === 'production';

const jsSourcePath = path.join(__dirname, './src/js');
const buildPath = path.join(__dirname, './build');
const sourcePath = path.join(__dirname, './src');

const devPort = process.env.PORT || 8080;

// Common plugins
const plugins = [
  new webpack.optimize.CommonsChunkPlugin({
    name: 'vendor',
    minChunks: Infinity,
    filename: 'vendor-[hash].js',
  }),
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify(nodeEnv),
      API_BASE: JSON.stringify(process.env.API_BASE),
    },
  }),
  new webpack.NamedModulesPlugin(),
  new HtmlWebpackPlugin({
    template: path.join(sourcePath, 'index.html'),
    path: buildPath,
    filename: 'index.html',
    favicon: '../assets/favicon.ico',
  }),
];

// Common rules
const rules = [
  {
    test: /\.(js|jsx)$/,
    exclude: /node_modules/,
    use: [
      'babel-loader',
    ],
  },
];

// Common entries
const entry = {
  js: [
    './index.js',
  ],
  vendor: [
    'babel-polyfill',
    'lodash',
    'moment',
    'query-string',
    'react',
    'react-dom',
    'react-redux',
    'react-router-dom',
    'react-router-redux',
    'redux',
    'redux-thunk',
    'seamless-immutable',
    'store',
    'styled-components',
    'whatwg-fetch',
  ],
};

if (isProduction) {
  // Production plugins
  plugins.push(
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false,
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        screw_ie8: true,
        conditionals: true,
        unused: true,
        comparisons: true,
        sequences: true,
        dead_code: true,
        evaluate: true,
        if_return: true,
        join_vars: true,
      },
      output: {
        comments: false,
      },
    })
  );
} else {
  // Development plugins
  plugins.push(
    new webpack.HotModuleReplacementPlugin()
  );

  entry.js = [
    'react-hot-loader/patch',
    `webpack-dev-server/client?http://0.0.0.0:${devPort}`,
    ...(Array.isArray(entry.js) ? entry.js : [entry.js]),
  ];
}

module.exports = {
  devtool: isProduction ? false : 'cheap-eval-source-map',
  context: jsSourcePath,
  entry,
  output: {
    path: buildPath,
    publicPath: '/',
    filename: 'app-[hash].js',
  },
  module: {
    rules,
  },
  resolve: {
    extensions: ['.webpack-loader.js', '.web-loader.js', '.loader.js', '.js', '.jsx'],
    modules: [
      path.resolve(__dirname, 'node_modules'),
      jsSourcePath,
    ],
  },
  plugins,
  devServer: {
    contentBase: buildPath,
    historyApiFallback: true,
    port: devPort,
    compress: isProduction,
    inline: !isProduction,
    hot: !isProduction,
    host: '0.0.0.0',
    publicPath: '/',
    stats: {
      assets: true,
      children: false,
      chunks: false,
      hash: false,
      modules: false,
      publicPath: false,
      timings: true,
      version: false,
      warnings: true,
      colors: {
        green: '\u001b[32m',
      },
    },
  },
};
