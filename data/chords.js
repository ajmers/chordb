var mongoose = require('mongoose');

var chordSchema = new mongoose.Schema({
    instrument: String,
    name: String,
    fingerings: [{
        stringName: String,
        position: String
    }],
    types: [String]
});

module.exports = mongoose.model('Chord', chordSchema);
