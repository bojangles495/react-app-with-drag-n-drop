
var path = require('path'); //eslint-disable-line

var HtmlWebpackPlugin = require('html-webpack-plugin')
var HTMLWebpackPluginConfig = new HtmlWebpackPlugin({
  template: __dirname + '/public/index.raw.html',
  filename: 'index.html',
  inject: 'body'
});

module.exports = {
	entry: {
    	index: './src/index.js'
	},
	output: {
	    path: path.resolve(__dirname, "build"),
    	publicPath: "/build/",
    	filename: "bundle.js"
	},
	module: {
	    loaders: [{
	        test: /\.jsx?$/,
	        exclude: /node_modules/,
	        loader: 'babel-loader'
	    },
	    {
	        test: /\.json$/,
	        loader: "json-loader"
	    }, {
	        test: /\.css$/, loader: "style-loader!css-loader"
	    }, {
	        test: /\.(eot|ttf|svg|gif|png|jpg)(\?-5joh1s)?$/,
	        loader: 'file-loader'
	    }
	    ]
	},
	resolve: {
	    extensions: ['', '.js', '.jsx', 'json']
	},
	resolveLoader: {
	    fallback: [path.join(__dirname, 'node_modules')]
	},
	plugins: [HTMLWebpackPluginConfig]
}


