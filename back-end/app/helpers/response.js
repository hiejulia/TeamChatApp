'use strict';

function responseToJSON(prop) {
  return function(req, res, next) {
    res.json(req.resources[prop]);
  }
}
module.exports.toJSON = responseToJSON;