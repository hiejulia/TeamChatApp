'use strict';


function authorizeOnlySelf(resource) {
    return function authorizeOnlySelfPolicy(req, res, next) {
        var isSelf = req.resources[resource].user.toString() === req.user._id.toString();

    }



}



module.exports.onlySelf = authorizeOnlySelf;
module.exports.onlyParticipants = authorizeOnlyParticipants;