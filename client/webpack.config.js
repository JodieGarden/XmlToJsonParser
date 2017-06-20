var config = {
  entry: './src/app.js',
  output: {
    path: __dirname + './build',
    filename: 'bundle.js'
  },
  devtool: "source-map",

  module: {
      loaders: [
        {
          test: /\.jsx?$/,
          loader: 'babel-loader',
          exclude: /node_modules/
        }
      ]
    }
};

module.exports = config;