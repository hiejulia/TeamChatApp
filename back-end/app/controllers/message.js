'use strict';



const mongoose = require('mongoose');
const Thread = mongoose.model('Thread');
const Message = mongoose.model('Message');
const ObjectId = mongoose.Types.ObjectId;
const MAX_LIMIT = 50;//set the max limit to show the messages 

function findMessagesByThread(req,res, next){
  const limit = +req.query.limit || MAX_LIMIT;
  const skip = +req.query.skip || 0;

  let query = {
      thread:req.resources.thread._id
  };
  if (req.query.beforeId) {
    query._id = { $lt: new ObjectId(req.query.sinceId) };
  }

  //call the Message model
  Message
  .find(query)
  .limit(limit)
  .skip(skip)
  .sort({ createdAt: 'asc' })
  .populate('sender')
  .exec((err, messages) => {
    if (err) {
      return next(err);
    }
    //if ok 
    req.resources.messages = messages;
    next();
  });
}





module.exports.findByThread = findMessagesByThread;