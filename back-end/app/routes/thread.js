'use strict';

const express = require('express');
const router = express.Router();
const threadCtrl = require('../controllers/thread');
const messageCtrl = require('../controllers/message');
const auth = require('../middlewares/authentication');
const authorize = require('../middlewares/authorization');
const response = require('../helpers/response');

//get all threads
router.get('/threads',auth.ensured,threadCtrl.allByUser,response.toJSON('threads'));
//create a new thread
router.post('/thread/open',auth.ensured,threadCtrl.find,threadCtrl.open,response.toJSON('thread'));
//get one thread by id
//check if the user is participant
//use authorization helper 

router.get('/threads/:threadId',auth.ensured,threadCtrl.findById,authorize.onlyParticipants('thread'),response.toJSON('thread'));

//get all the messages of a thread 
router.get('/threads/:threadId/messages',auth.ensured,threadCtrl.findById,authorize.onlyParticipants('thread'),messageCtrl.findByThread,response.toJSON('messages'));

module.exports = router;