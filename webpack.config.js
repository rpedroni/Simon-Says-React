module.exports = {
	entry: './src/app/main.js',
	output: {
		filename: 'bundle.js'
	},
	module: {
    loaders: [
      { test: /\.coffee$/, loader: 'coffee-loader' },
      { test: /\.js$/, loader: 'babel-loader' }
    ]
  }
};
