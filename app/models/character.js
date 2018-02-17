// app/models/character.js

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var characterConfig = require('../../config/character');
var fieldsRequired = false;

var CharacterSchema = mongoose.Schema({
    user_id: { 
        type: Schema.Types.ObjectId, 
        ref: 'User' 
    },
    name: {
        type: String,
        required: fieldsRequired
    },
    class: {
        type: String, 
        enum: characterConfig.classes,
        required: fieldsRequired
    },
    level: {
        type: Number
    },
    race: {
        type: String, 
        enum: characterConfig.races,
        required: fieldsRequired
    },
    background: {
        type: String, 
        enum: characterConfig.backgrounds,
        required: fieldsRequired
    },
    alignment: {
        type: String, 
        enum: characterConfig.alignments,
        required: fieldsRequired 
    },
    experience_points: { type: Number },
    inspiration: { type: Number },
    strength: { type: Number },
    dexterity: { type: Number },
    constitution: { type: Number },
    wisdom: { type: Number },
    intelligence: { type: Number },
    charisma: { type: Number },

    date_created: {
        type: Date,
        default: Date.now
    } 
});

module.exports = mongoose.model('Character', CharacterSchema);
