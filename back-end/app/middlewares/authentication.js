'use strict';

//ensure authentication

function ensureAuthenticated(req, res, next) {
    if(req.isAuthenticated()){
        return next();
    }
//else not authenticated

    res.format({
        html: function() {
      res.redirect('/login');
    },
   
    text: function() {
      res.redirect('/login');
    },
    json: function() {
      res.status(401).json({ message: 'Unauthorized' });
    }
  });
 


}

module.exports.ensured = ensureAuthenticated