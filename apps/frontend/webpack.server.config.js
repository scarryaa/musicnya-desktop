const { withModuleFederationForSSR } = require('@nx/angular/module-federation');
const config = require('./module-federation.config');
module.exports = withModuleFederationForSSR(config, {
  shared: {
    '@angular/core': {
      singleton: true,
      strictVersion: false,
      requiredVersion: 'auto',
      eager: true,
    },
    '@angular/common': {
      singleton: true,
      strictVersion: false,
      requiredVersion: 'auto',
      eager: true,
    },
    '@angular/common/http': {
      singleton: true,
      strictVersion: false,
      requiredVersion: 'auto',
      eager: true,
    },
    '@angular/router': {
      singleton: true,
      strictVersion: false,
      requiredVersion: 'auto',
      eager: true,
    },
    '@angular/platform-browser': {
      singleton: true,
      strictVersion: false,
      requiredVersion: 'auto',
      eager: true,
    },
  },
});
