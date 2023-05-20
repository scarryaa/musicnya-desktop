const { writeFile } = require('fs');
const { argv } = require('yargs');

// read environment variables from .env file
require('dotenv').config();

localStorage.setItem('DEV_TOKEN', process.env.WEB_TOKEN ?? 'UNDEFINED');
console.log(process.env.WEB_TOKEN);
