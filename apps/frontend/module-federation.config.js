var webpack = require('webpack');

module.exports = {
  name: 'frontend',
  remotes: ['home', 'search', 'media-details'],
  plugins: [
    new webpack.DefinePlugin({
      'process.env': JSON.stringify(process.env),
    }),
  ],
};
