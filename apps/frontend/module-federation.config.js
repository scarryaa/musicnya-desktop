/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
/* eslint-disable unicorn/prefer-module */
var webpack = require('webpack');

module.exports = {
  name: 'frontend',
  remotes: ['home', 'search', 'media-details', 'artist-details'],
  plugins: [
    new webpack.DefinePlugin({
      'process.env': JSON.stringify(process.env),
    }),
  ],
};
