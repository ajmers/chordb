var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var chordSchema = new Schema({
    instrument: String,
    tonic: String,
    type: String,
    name: String,
    minFret: Number,
    fingerings: [{
        string: String,
        fret: String,
        finger: Number
    }],
});

module.exports = mongoose.model('Chord', chordSchema);
