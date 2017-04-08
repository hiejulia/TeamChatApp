'use strict';

module.exports = {
  port: 3000,
  hostname: "127.0.0.1",
  baseUrl: 'http://localhost:3000',
  mongodb: {
    uri: "mongodb://localhost/teamchatapp"
  },
  app: {
    name: "Team Chat App"
  },
  serveStatic: true,
  session: {
    secret: 'On#MustNotGiv3S#cretsAwAy!2any1',
    type: 'mongodb',                        
    resave: false,                           
    saveUninitialized: true                   
  },
  proxy: {
    trust: true
  },
  swig: {
    cache: false
  }
}