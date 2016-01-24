var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var chordSchema = new Schema({
    instrument: String,
    name: String,
    fingerings: [{
        stringName: String,
        position: String
    }],
    types: [String]
});

module.exports = mongoose.model('Chord', chordSchema);
