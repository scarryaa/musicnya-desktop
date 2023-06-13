const { withModuleFederation } = require('@nx/angular/module-federation');
const config = require('./module-federation.config');
module.exports = withModuleFederation(config, {
  shared: {
    '@angular/core': {
      singleton: true,
    },
    '@angular/common': {
      singleton: true,
    },
    '@angular/router': {
      singleton: true,
    },
    '@angular/common/http': {
      singleton: true,
    },
    '@angular/platform-server': {
      singleton: true,
    },
  },
});
