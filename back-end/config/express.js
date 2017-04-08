'use strict';

const path = require('path');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const serveStatic = require('serve-static');
const session = require('express-session');
const passport = require('passport');
const MongoStore = require('connect-mongo')(session);
const config = require('./index');

function initExpress(app){
    const root = app.get('root');
    //session options

    const sessionOpts = {
    secret: config.session.secret,
    key: 'skey.sid',
    resave: config.session.resave,
    saveUninitialized: config.session.saveUninitialized
  };
  //express config for middlewares
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.use(methodOverride());
  app.disable('x-powered-by');

  if(config.session.type === 'mongo'){
      sessionOpts.store = new MongoStore({
      url: config.mongodb.uri
    });

  }

  //middleware for authentication 
  app.use(session(sessionOpts));
  app.use(passport.initialize());
  app.use(passport.session());

  app.use(function(req,res,next){
    req.resources =  req.resources || {};
    next();
  });
  //if dev env => load static files
   if (config.serveStatic) {
    app.use(serveStatic(path.join(root, '../front-end')));//public files for front-end 
  }

}




module.exports.init = initExpress;
