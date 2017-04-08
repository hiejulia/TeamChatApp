'use strict';
var mongoose = require('mongoose');
var config = require('./index');

function initMongoose(app) {
    //connect to mongodb
     mongoose.connect(config.mongodb.uri);
     // If the Node process ends, cleanup existing connections
  process.on('SIGINT', cleanup);
  process.on('SIGTERM', cleanup);
  process.on('SIGHUP', cleanup);

  if (app) {
      //set var
    app.set('mongoose', mongoose);
  }

  return mongoose;


}
function cleanup(){
    //close mongo db connection
    mongoose.connection.close(() => {
    process.exit(0);
  });
}








//exports
module.exports.init = initMongoose;
