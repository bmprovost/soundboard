'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Sound = mongoose.model('Sound'),
    _ = require('lodash');


/**
 * Find sound by id
 */
exports.sound = function(req, res, next, id) {
    Sound.load(id, function(err, sound) {
        if (err) return next(err);
        if (!sound) return next(new Error('Failed to load sound ' + id));
        req.sound = sound;
        next();
    });
};

/**
 * Create a sound
 */
exports.create = function(req, res) {
    var sound = new Sound(req.body);
    sound.user = req.user;

    sound.save(function(err) {
        if (err) {
            return res.send('users/signup', {
                errors: err.errors,
                sound: sound
            });
        } else {
            res.jsonp(sound);
        }
    });
};


/**
 * Update a sound
 */
exports.update = function(req, res) {
    var sound = req.sound;

    sound = _.extend(sound, req.body);

    sound.save(function(err) {
        if (err) {
            return res.send('users/signup', {
                errors: err.errors,
                sound: sound
            });
        } else {
            res.jsonp(sound);
        }
    });
};

/**
 * Delete a sound
 */
exports.destroy = function(req, res) {
    var sound = req.sound;

    sound.remove(function(err) {
        if (err) {
            return res.send('users/signup', {
                errors: err.errors,
                sound: sound
            });
        } else {
            res.jsonp(sound);
        }
    });
};

/**
 * Show a sound
 */
exports.show = function(req, res) {
    res.jsonp(req.sound);
};

/**
 * List of sounds
 */
exports.all = function(req, res) {
    Sound.find().sort('-created').populate('user', 'name username').exec(function(err, sounds) {
        if (err) {
            res.render('error', {
                status: 500
            });
        } else {
            res.jsonp(sounds);
        }
    });
};
