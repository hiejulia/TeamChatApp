'use strict';
const passport = require('passport');
const mongoose = require('mongoose');
function signoutUser(req,res,next){
    req.logout();
    res.redirect('/');

}
function loginUser(req,res,next){
    //first: authenticate user 
    passport.authenticate('local',(err,user,info) =>{
        if(err){
            return next(err);
        }

        if(!user){
            return res.status(404).json(info);
        }
        req.login(user,(err) => {
            if(err) {
                return next(err);
            }
            //ok 
            res.status(200).json(user);
        });
    })(req,res,next);

    //then log in 


}


module.exports.login = loginUser;
module.exports.signout = signoutUser;