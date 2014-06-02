'use strict';

var sounds = require('../controllers/sounds');

// The Package is past automatically as first parameter
module.exports = function(Sounds, app, auth, database) {

    app.get('/sounds/example/anyone', function (req,res,next) {
      res.send('Anyone can access this');
    });

    app.get('/sounds/example/auth',auth.requiresLogin, function (req,res,next) {
      res.send('Only authenticated users can access this');
    });

    app.get('/sounds/example/admin',auth.requiresAdmin, function (req,res,next) {
      res.send('Only users with Admin role can access this');
    });

    app.get('/sounds/example/render', function (req,res,next) {
      Sounds.render('index', {package:'sounds'}, function (err, html) {
        //Rendering a view from the Package server/views
        res.send(html);
      });
    });

    app.route('/sounds')
      .get(sounds.all)
      .post(auth.requiresLogin, sounds.create);
};
