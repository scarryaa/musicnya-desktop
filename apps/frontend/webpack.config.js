const { withModuleFederation } = require('@nx/angular/module-federation');
const Dotenv = require('dotenv-webpack');

module.exports = {
  plugins: [new Dotenv()],
};

const config = require('./module-federation.config');
module.exports = withModuleFederation(config);
