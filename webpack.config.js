'use strict';

var productionEnv = 'production';
var debug = productionEnv !== 'production';
let webpack = require('webpack');
let path = require('path');

module.exports = {
	context: path.join(__dirname),
    devtool: debug ? 'inline-sourcemap' : false,
    entry: {
        javascript: './client/js/client.js',
		html: './client/index.html'
    },
    module: {
        loaders: [{
	        test: /\.jsx?$/,
	        exclude: /(node_modules|bower_components)/,
	        loader: 'babel-loader',
	            query: {
	            	presets: ['react', 'es2015', 'stage-0'],
	                plugins: ['react-html-attrs', 'transform-class-properties', 'transform-decorators-legacy'],
	            },
	    },
	    {
		    test: /\.html$/,
		    loader: 'file?name=[name].[ext]',
	    },
	    {
	    	test: /\.css$/,
	        loader: 'style-loader!css-loader',
	  	},
      	{
			test: /\.less$/,
        	loader: 'style!css!less',
      	},
	  	{
			test: /\.json$/,
			loader: 'json',
	  	}]
    },
    output: {
		path: __dirname + '/client/js',
    	filename: 'client.min.js'
    },
    plugins: debug ? [] : [
		new webpack.DefinePlugin({
			'process.env': {NODE_ENV: JSON.stringify('production')}
		}),
		new webpack.optimize.UglifyJsPlugin({mangle: false, sourcemap: false})
    ]
};
