'use strict';

const mongoose = require('mongoose');
const Thread = mongoose.model('Thread');

//find one thread
function findThreadById(req,res,next){
    var query = {};

}








module.exports.findById = findThreadById;
module.exports.allByUser = allThreadsByUser;
module.exports.findDirect = findDirectThread;

module.exports.find = findThread;
module.exports.open = openThread;
