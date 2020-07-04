const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const htmlWebpackPlugin = new HtmlWebpackPlugin({
  template: path.join(__dirname, 'playground/index.html'),
  filename: './index.html',
  inject: 'body',
})

module.exports = {
  entry: path.join(__dirname, 'playground/index.js'),
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        use: 'file-loader',
        test: /\.(woff(2)?|ttf)(\?v=\d+\.\d+\.\d+)?$/,
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        use: [
          'file-loader',
          {
            loader: 'image-webpack-loader',
            options: {
              disable: true,
            },
          },
        ],
      },
    ],
  },
  plugins: [htmlWebpackPlugin],
  devServer: {
    port: 3001,
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
}
