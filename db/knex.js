const environment = process.env.NODE_ENV || 'development';
var config = require('../src/knexfile.js')[environment];

console.log(config);

module.exports = require('knex')(config);
