'use strict';

const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user');
const auth = require('../middlewares/authentication');
const authorize = require('../middlewares/authorization');
const response = require('../helpers/response');

//users --- get all the uses => need to authen first 
router.get('/users',auth.ensured,userCtrl.getAll,response.toJSON('users'));

//get one user by id
router.get('/users/:userId',auth.ensured,userCtrl.findById,response.toJSON('user'));
//update one user by user id
//1.need to authen first and need t authorized self user
router.put('/users/:userId',auth.ensured,userCtrl.findById,authorize.onlySelf('user'),userCtrl.update,response.toJSON('user'));

//export router 
module.exports = router;