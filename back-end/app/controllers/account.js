'use strict';
const _ = require('lodash');
const mongoose = require('mongoose');
const User = mongoose.model('User');
function registerUser(req, res, next) {
    //get user data
    let userData = _.pick(req.body,'name','email','password');

    if(req.body.type==='company'){
        userData.roles =['owner'];
    }

    //call user register from user model
    User.register(userData,(err, user) => {
        if(err && (11000 === err.code || 11001 === err.code)){
            return res.status(400).json({ message: 'E-mail is already in use.' });
        }

        if (err) {
            return next(err);
        }
        //after use sign up, log in => need save session of the user
        req.logIn(user, (err) => {
     
      delete user.password;
      delete user.passwordSalt;

      res.json(user);
    });
  });
}


module.exports.register = registerUser;