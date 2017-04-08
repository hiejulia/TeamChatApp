'use strict';


module.exports.init = initModels;

function initModels(app) {
  const modelsPath = app.get('root') + '/app/models/';
//user model
//thread,message
  ['user', 'thread', 'message'].forEach(function(model) {
    require(modelsPath + model);
  });
};