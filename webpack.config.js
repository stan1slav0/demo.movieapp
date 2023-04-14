const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  entry: '/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          output: {
            comments: /^\**!|@preserve|@license|@cc_on/i,
          },
        },
      }),
    ],
  },
};
