'use strict';

var sounds = require('../controllers/sounds');

// The Package is past automatically as first parameter
module.exports = function(Sounds, app, auth, database) {

    app.route('/sounds')
      .get(sounds.all)
      .post(auth.requiresLogin, sounds.create);
    app.route('sounds/:soundId')
      .get(sounds.show);

    app.param('soundId', sounds.sound);
};
