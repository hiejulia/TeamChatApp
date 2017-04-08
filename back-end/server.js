'use strict';
// set env = development
const ENV = process.env.NODE_ENV || 'development';
const http = require('http');
const express = require('express');
const config = require('./config');
const app = express();//express instance 
const DEFAULT_PORT = 3000;
const DEFAULT_HOSTNAME= '127.0.0.1';
let server = http.Server(app);//create server 
//set express variables
app.set('config',config);
app.set('root',__dirname);
app.set('env',ENV);
//require middleware
//mongoose
require('./config/mongoose').init(app);
//models
require('./config/models').init(app);
//passport 
require('./config/passport').init(app);
//express
require('./config/express').init(app);
//route
require('./config/routes').init(app);

//init chat services
require('./app/services/chat')(app, server);//express and server

//set global error handler
app.use(function(err,req,res,next){
    console.error(err);
    res.status(500).json(err);
});
//start the app if not loaded by other modules
if(!module.parent){
    server = http.createServer(app);
    server.listen(
        config.port || DEFAULT_PORT,
        config.hostname || DEFAULT_HOSTNAME,
        () => {
            console.log(`Running on port ${config.port}`)
        }
    );
}
module.exports = app;