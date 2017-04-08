'use strict';
const _ = require('lodash');
const mongoose = require('mongoose');
const User = mongoose.model('User');
const ObjectId = mongoose.Types.ObjectId;
function findUserById(req,res,next){
    //check id 
    if (!ObjectId.isValid(req.params.userId)) {
    return res.status(404).json({ message: '404 not found.'});
  }
//call findById with user id 
  User.findById(req.params.userId, function(err, user) {
      if(err) {
          return next(err);
      } else if(user){
          req.resources.user = user;
          next();
      } else {
          next(new Error('failed to find user'));
      }



  });

};

function getAllUsers(req,res,next){
    User.find((err,users) => {
        if(err) {
            return next(err);
        }

        //ok
        req.resources.users = users;
        next();

    });

};
function updateUser(req, res, next) {
  var user = req.resources.user;
  _.assign(user, req.body);

  user.save(function(err, updatedUser) {
    if (err) {
      return next(err);
    }

    res.resources.user = updatedUser;
    next();
  });
};

function deleteUser(req, res, next) {
  req.resources.user.remove(function(err) {
    if (err) {
      return next(err);
    }

    res.status(204).json();
  });
}




module.exports.findById = findUserById;
module.exports.getAll = getAllUsers;
module.exports.update = updateUser;
module.exports.remove = deleteUser;