'use strict';

var sounds = require('../controllers/sounds');

var hasAuthorization = function(req, res, next) {
    if (!req.user.isAdmin && req.article.user.id !== req.user.id) {
        return res.send(401, 'User is not authorized');
    }
    next();
};

// The Package is passed automatically as first parameter
module.exports = function(Sounds, app, auth) {

    app.route('/sounds')
      .get(sounds.all)
      .post(auth.requiresLogin, sounds.create);
    app.route('sounds/:soundId')
      .get(sounds.show)
      .delete(auth.requiresLogin, hasAuthorization, sounds.destroy);

    app.param('soundId', sounds.sound);
};
