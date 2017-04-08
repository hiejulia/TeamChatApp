'use strict';

var express = require('express');
var router = express.Router();
var threadCtrl = require('../controllers/thread');
var auth = require('../middlewares/authentication');
var authorize = require('../middlewares/authorization');
var response = require('../helpers/response');
//create new chat .start
router.post('/chat/start',auth.ensured,threadCtrl.allByUser,function(req, res, next) {
    var payload = {};
//create payload to hold the req 
    payload.self = req.user._id;//user id
    payload.threads = req.resources.threads || [];//thread
    payload.online = req.resources.online || [];//isOnline
    payload.url = '';

    req.resources.payload = payload;//set req payload = payload
    next();
  },
  response.toJSON('payload')//response 
);
//router.post('/thread/open', auth.ensured, threadCtrl.find, threadCtrl.open, response.toJSON('thread'));
module.exports = router;