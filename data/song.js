var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var songSchema = new Schema({
    title: String,
    chords: [String]
});

module.exports = mongoose.model('Song', songSchema);
