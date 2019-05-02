const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const nodeExternals = require('webpack-node-externals')

module.exports = {
  watch: false, 
  mode: 'development',
  entry: [
    './src/server/app.js',
    './data.csv'
  ],
  output: {
    filename: 'server.js',
    path: path.resolve(__dirname, 'dist')
  },
  target: 'node',
  node: {
    // Need this when working with express, otherwise the build fails
    __dirname: false,   // if you don't put this is, __dirname
    __filename: false,  // and __filename return blank or /
  },
  externals: [nodeExternals()], // Need this to avoid error when working with Express
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader"
      },
      {
        test: /\.(txt|csv)$/,
        use: [
          {
            loader: "file-loader",
            options: {
                name: "[path][name].[ext]",
                emitFile: true,
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: './src/index.html'
    })
  ]
};