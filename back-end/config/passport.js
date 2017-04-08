'use strict';

const passport = require('passport');
const mongoose = require('mongoose');
const User = mongoose.model('User');//User model
function initPassport(app){
    //serialize
    passport.serializeUser((user, done) => {
    done(null, user.id);
  });


    //deserialize
    passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      done(err, user);
    });
  });

  //load strategies
  require('./strategies/local').init();    


}








module.exports.init = initPassport;