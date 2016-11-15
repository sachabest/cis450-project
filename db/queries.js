var schema = require('./schema.js');

var exports = module.exports = {};

exports.findSimilar = function(start_song, radius) {

};

exports.getDashboard = function() {

};

// Find songs that have the msot words in common
exports.findCommon = function(toCount) {
    var songWords = schema.models.song_word_count.aggregate([
        {
            $group: {
                _id: "$song_id",
                words: {
                    $addToSet: "$word"
                }
            }
        }
    ]);
    // song_words maps song id to the words contained in that song
    var mostCommon = [];
    songWords.forEach(function(value, index) {
        
    });
};

// Find songs according to a filter
exports.filterSongs = function(filter) {
    schema.models.song.find(filter, {
        _id: 0,
        title: 1
    }, function(err, result) {
        if (err) throw err;
        return result
    });
};

// Autocomplete songs by name
exports.autocompleteSongs = function(song_name) {
    schema.models.song.find({
        title: song_name
    }, {
        _id: 0,
        title: 1
    }, function(err, result) {
        if (err) throw err;
        return result
    });
};

exports.genres = function() {
    return schema.models.genre.find().lean().exec(function (err, users) {
        return users;
    });
};