/* eslint-disable no-undef */
/* eslint-disable unicorn/prefer-module */
/* eslint-disable @typescript-eslint/no-var-requires */
const { withModuleFederation } = require('@nx/angular/module-federation');
const config = require('./module-federation.config');
module.exports = withModuleFederation(config, {
  shared: {
    '@angular/core/': {
      singleton: true,
      strictVersion: true,
      requiredVersion: '^12.0.0',
      eager: true,
    },
    '@angular/common/': {
      singleton: true,
      strictVersion: true,
      requiredVersion: '^12.0.0',
      eager: true,
    },
    '@angular/common/http/': {
      singleton: true,
      strictVersion: true,
      requiredVersion: '^12.0.0',
      eager: true,
    },
    '@angular/router/': {
      singleton: true,
      strictVersion: true,
      requiredVersion: '^12.0.0',
      eager: true,
    },
  },
});
