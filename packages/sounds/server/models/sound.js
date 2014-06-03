'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


/**
 * Sound Schema
 */
var SoundSchema = new Schema({
    created: {
        type: Date,
        default: Date.now
    },
    text: {
        type: String,
        default: '',
        trim: true
    },
    user: {
        type: Schema.ObjectId,
        ref: 'User'
    }
});

/**
 * Validations
 */
SoundSchema.path('text').validate(function(text) {
    return text.length;
}, 'Type something!');

/**
 * Statics
 */
SoundSchema.statics.load = function(id, cb) {
    this.findOne({
        _id: id
    }).populate('user', 'name username').exec(cb);
};

mongoose.model('Sound', SoundSchema);
