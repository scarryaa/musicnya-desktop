/* eslint-disable functional/no-expression-statements */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
/* eslint-disable unicorn/prefer-module */
const webpack = require('webpack');

// eslint-disable-next-line functional/immutable-data
module.exports = {
  name: 'frontend',
  remotes: [
    'home',
    'search',
    'media-details',
    'artist-details',
    'settings',
    'browse',
    'radio',
    'library',
    'curator-details',
    'room',],
  plugins: [
    new webpack.DefinePlugin({
      'process.env': JSON.stringify(process.env),
    }),
  ],
  webpack: {
    resolve: {
      fallback: {
        os: 'empty',
        fs: 'empty',
      },
    },
  },
};
