var mongoose = require('mongoose');

var exports = module.exports = {};
var models = exports.models = {};

var song = new mongoose.Schema({
    song_id: String,
    artist: String,
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

var similar_songs = new mongoose.Schema({
    song_id: String,
    similar_song_id: [[String]]
});

var genre = new mongoose.Schema({
    song_id: String,
    genre: String,
    strength: Number
});

var words = new mongoose.Schema({
    song_id: String,
    word: String,
    count: Number
});

var users = new mongoose.Schema({
    user_id: String,
    song_id: String,
    count: Number
});

var covers = new mongoose.Schema({
    cover_group_id: Number,
    song_id: String
});

models.song = mongoose.model('songs', song);
models.artist = mongoose.model('artists', artist);
models.tag = mongoose.model('tags', tag);
models.similar_songs = mongoose.model('similar_songs', similar_songs);
models.genre = mongoose.model('genres', genre);
models.words = mongoose.model('words', words);
models.users = mongoose.model('users', users);
models.covers = mongoose.model('covers', covers);