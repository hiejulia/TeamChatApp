'use strict';
// set env = development
const ENV = process.env.NODE_ENV || 'development';
const http = require('http');
const express = require('express');
const config = require('./config');
const app = express();

let server = http.Server(app);