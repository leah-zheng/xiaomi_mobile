const path = require('path');
const uglify = require('uglifyjs-webpack-plugin');
const htmlWebpackPlugin = require('html-webpack-plugin');
const autoprefixer = require('autoprefixer');

const config = {
  mode: 'development', //production
  entry: {
  	index: path.resolve(__dirname, './src/js/Index.js'),
    list: path.resolve(__dirname, './src/js/List.js'),
    detail: path.resolve(__dirname, './src/js/Detail.js')
  },
  output: {
  	path: path.resolve(__dirname + '/dist'),
  	filename: 'js/[name].js'
  },
  module: {
  	rules: [
      {
      	test: /\.js$/,
      	loader: 'babel-loader',
      	exclude: path.resolve(__dirname, 'node_modules'),
      	query: {
      		'presets': ['latest']
      	}
      },

      {
      	test: /\.tpl$/,
      	loader: 'ejs-loader'
      },

      {
        test: /\.scss$/,
        use: [
	        'style-loader',
	        'css-loader',
	        {
	        	loader: 'postcss-loader',
	        	options: {
	        		plugins: function () {
	        			return [autoprefixer('last 5 versions')]
	        		}
	        	}
	        },
	        'sass-loader'
        ]
      },

      {
        test: /\.css$/,
        loader: 'css-loader'
      },

      {
      	test: /\.(png|jpg|jpeg|gif|ico)$/i,
      	loader: [
          'url-loader?limit=1024&name=img/[name]-[hash:16].[ext]',
      	]
      }
  	]
  },

  plugins: [
    new uglify(),
    new htmlWebpackPlugin({
      minify: {
      	removeComments: true,
      	collapseWhitespace: true
      },
      filename: 'index.html',
      template: path.resolve(__dirname, 'src/index.html'),
      title: '小米手机官网',
      chunksSortMode: 'manual',
      chunks: ['index'],
      excludeChunks: ['node_modules'],
      hash: true
    }),
    new htmlWebpackPlugin({
      minify: {
        removeComments: true,
        collapseWhitespace: true
      },
      filename: 'list.html',
      template: path.resolve(__dirname, 'src/list.html'),
      title: '小米手机官网',
      chunksSortMode: 'manual',
      chunks: ['list'],
      excludeChunks: ['node_modules'],
      hash: true
    }),
    new htmlWebpackPlugin({
      minify: {
        removeComments: true,
        collapseWhitespace: true
      },
      filename: 'detail.html',
      template: path.resolve(__dirname, 'src/detail.html'),
      title: '小米手机官网',
      chunksSortMode: 'manual',
      chunks: ['detail'],
      excludeChunks: ['node_modules'],
      hash: true
    })
  ],

  devServer: {
  	watchOptions: {
  		ignored: /node_modules/
  	},
    open: true,
  	host: 'localhost',
  	port: 3300
  }
};

module.exports = config;






