'use strict';

const express = require('express');
const router = express.Router();
const auth = require('../middlewares/authentication');
const authCtrl = require('../controllers/authentication');
const userCtrl = require('../controllers/user');
const accountCtrl = require('../controllers/account');
//no need for authen
router.post('/login', authCtrl.login);
router.get('/signout', authCtrl.signout);

router.post('/register', accountCtrl.register);

module.exports = router;