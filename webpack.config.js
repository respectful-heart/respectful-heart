const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const yargs = require('yargs')

if (yargs.argv.env === 'local') {
  require('./mock-backend/server')
}

const cdnResources = {
  css: [{
    href: 'https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css',
    integrity: 'sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm',
    crossorigin: 'anonymous'
  }]
}

module.exports = {
  entry: path.join(__dirname, 'src', 'index.jsx'),
  output: {
    path: path.join(__dirname, 'build'),
    filename: 'bundle.[hash].js'
  },
  module: {
    rules: [{
      test: /\.(js|jsx)$/,
      enforce: 'pre',
      use: [{
        loader: 'babel-loader',
        options: {
          presets: [ 'env', 'react', 'flow' ],
          plugins: [ 'transform-class-properties' ]
        }
      }]
    }, {
      test: /\.hbs$/,
      loader: 'handlebars-loader'
    }, {
      test: /\.css$/,
      use: [{
        loader: 'style-loader'
      }, {
        loader: 'css-loader',
        options: {
          modules: true,
          localIdentName: '[name]__[local]--[hash:base64:5]',
          importLoaders: 1
        }
      }, {
        loader: 'postcss-loader'
      }]
    }, {
      test: /\.(svg|jpg|png)$/,
      loader: 'url-loader',
      options: {
        limit: 8192
      }
    }]
  },
  resolve: {
    extensions: [ '.js', '.jsx' ],
    alias: {
      actions: path.resolve(__dirname, 'src/app/actions/index.js'),
      components: path.resolve(__dirname, 'src/app/components'),
      containers: path.resolve(__dirname, 'src/app/containers'),
      models: path.resolve(__dirname, 'src/models/index.js'),
      reducers: path.resolve(__dirname, 'src/app/reducers/index.js'),
      utils: path.resolve(__dirname, 'src/utils'),
      images: path.resolve(__dirname, 'src/images')
    }
  },
  devServer: {
    port: 7001,
    contentBase: path.join(__dirname, 'build'),
    compress: true,
    historyApiFallback: true
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Respectful Heart Counseling, LLC',
      template: path.join(__dirname, 'src', 'index.template.hbs'),
      inject: 'body',
      cdnResources
    })
  ]
}
