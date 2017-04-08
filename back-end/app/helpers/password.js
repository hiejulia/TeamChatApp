'use strict';

//hash the pw
const LEN = 256;
const SALT_LEN = 64;
const ITERATIONS = 10000;
const DIGEST = 'sha256';
const crypto = require('crypto');

//create a hash base on the salt of the pw
//if no salt => new salt will be created

function hashPassword(password, salt, callback) {

 var len = LEN / 2;

 if (arguments.length === 3) {

     crypto.pbkdf2(password, salt, ITERATIONS, len, DIGEST, (err, derivedKey) => {
      if (err) {
        return callback(err);
      }

      return callback(null, derivedKey.toString('hex'));
    });
  } else {
    callback = salt;
    crypto.randomBytes(SALT_LEN / 2, (err, salt) => {
      if (err) {
        return callback(err);
      }

      salt = salt.toString('hex');
      crypto.pbkdf2(password, salt, ITERATIONS, len, DIGEST, (err, derivedKey) => {
        if (err) {
          return callback(err);
        }

        callback(null, derivedKey.toString('hex'), salt);
      });
    });
  }
}


//verify if the password matching the hash by hash the pw with  given salt
function verify(password, hash, salt, callback) {
    //call the hash password 
    hashPassword(password, salt, (err, hashedPassword) => {
        
    if (err) {
      return callback(err);
    }

    if (hashedPassword === hash) {
      callback(null, true);
    } else {
      callback(null, false);
    }
  });
};


module.exports.hash = hashPassword;
module.exports.verify = verify;