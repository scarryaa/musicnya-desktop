const { withModuleFederation } = require('@nx/angular/module-federation');

module.exports = {};

const config = require('./module-federation.config');
module.exports = withModuleFederation(config);
