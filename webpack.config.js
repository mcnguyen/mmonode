const HtmlWebpackPlugin = require('html-webpack-plugin')

const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: './src/index.html',
  filename: 'index.html',
  inject: 'body'
})

module.exports = {
  entry: [
    './src/app.js'
  ],
  output: {
    path: __dirname,
    filename: 'public/build/app.bundle.js'
  },
  plugins: [HtmlWebpackPluginConfig],
  module: {
    loaders: [
      { test: /\.(js|jsx)$/, loader: 'babel-loader', exclude: /node_modules/ }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx']
  }
}
