'use strict';

//set dev env
const ENV = process.env.NODE_ENV || 'development';
const config = require('./environments/'+ENV.trim().toLowerCase());


module.exports = config;