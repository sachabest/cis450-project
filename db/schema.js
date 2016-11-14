var mongoose = require('mongoose');

var exports = module.exports = {};
var models = exports.models = {};

var song = new mongoose.Schema({
    song_id: String,
    artist_id: String,
    title: String
});

var artist = new mongoose.Schema({
    artist_id: String,
    name: String
});

var tag = new mongoose.Schema({
    song_id: String,
    tag: String
});

var similar_song = new mongoose.Schema({
    song_id: String,
    similar_song_id: String
});

var cover = new mongoose.Schema({
    cover_group_id: String,
    song_id: String
});

var genre = new mongoose.Schema({
    song_id: String,
    genre: String
});

var song_word_count = new mongoose.Schema({
    song_id: String,
    word: String,
    count: Number
});

var user_data = new mongoose.Schema({
    user_id: String,
    song_id: String,
    count: Number
});

models.song = mongoose.model('song', song);
models.artist = mongoose.model('artist', artist);
models.tag = mongoose.model('tag', tag);
models.similar_song = mongoose.model('similar_song', similar_song);
models.genre = mongoose.model('genre', genre);
models.song_word_count = mongoose.model('song_word_count', song_word_count);
models.user_data = mongoose.model('user_data', user_data);