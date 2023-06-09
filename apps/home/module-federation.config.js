var webpack = require('webpack');
const ModuleFederationPlugin =
  require('webpack').container.ModuleFederationPlugin;

module.exports = {
  name: 'home',
  exposes: {
    './Routes': 'apps/home/src/app/remote-entry/entry.routes.ts',
  },
  webpack: {
    resolve: {
      fallback: {
        os: 'empty',
        fs: 'empty',
      },
    },
  },
};
