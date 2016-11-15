var schema = require('./schema.js');

var exports = module.exports = {};

exports.findSimilar = function(start_song, radius) {

};

exports.getDashboard = function() {

};

// Find songs that are similar to a given song title
exports.similarSongs = function(songTitle) {
	var id = schema.models.songs.find({
		title: songTitle
	}).toArray[0].song_id;
	return schema.models.similar_songs.find({
		song_id: id
	}, {
		_id: 0,
		song_id: 0
	}).toArray();
};

// Find an artist's songs
exports.artistGenres = function(artistName) {
	var artistId = schema.models.artists.find({
		name: artistName
	}).toArray[0].artist_id;
	return schema.models.songs.find({
		artist_id: artistId
	}, {
		_id: 0,
		song_id: 0
	});
};

// Find an artist's common genres
exports.artistGenres = function(artistName) {
	var artistId = schema.models.artists.find({
		name: artistName
	}).toArray[0].artist_id;
	var songs = schema.models.songs.find({
		artist_id: artistId
	}, {
		_id: 0,
		title: 0
	});
	return schema.models.genres.find({
		song_id: {
			$in: songs
		}
	}, {
		song_id: 0
	}).toArray();
};

// Find what a song has been tagged as
exports.songTags = function(title) {
	var id = schema.models.songs.find({
		title: songTitle
	}).toArray[0].song_id;
	return schema.models.tags.find({
		song_id: id
	}, {
		_id: 0,
		song_id: 0
	}).toArray();
};

// Find the songs that have been played the most
exports.mostPopularSongs = function() {
	return schema.models.user_data.aggregate([
        {
            $group: {
                _id: "$song_id",
                count: { $sum: 1 }
            }
        }
    ]).sort({count: -1}).toArray();
};

// Find songs that have been covered many times
exports.commonlyCoveredSongs = function() {
	return schema.models.covers.aggregate([
        {
            $group: {
                _id: "$song_id",
                count: { $sum: 1 }
            }
        }
    ]).sort({count: -1}).toArray();
};

// Find songs that have the most words in common
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
    // songWords maps song id to the most popular words contained in that song
    var mostCommon = [];
    var songPairs = songWords.forEach(function(song1) {
    	songWords.forEach(function(song2) {
			var words1 = song1.words;
			var words2 = song2.words;
			var intersection = words1.filter(function(word) {
				return words2.indexOf(word) > -1;
			});
			mostCommon.push({
				song1: song1._id,
				song2: song2._id,
				commonWords: intersection.length
			});
    	};
    });
    return songPairs.sort(function(a, b) {
    	return a.count < b.count;
    });
};

// Find songs according to a filter
exports.filterSongs = function(filter) {
    return schema.models.song.find(filter, {
        _id: 0,
        title: 1
    }, function(err, result) {
        if (err) throw err;
        return result
    });
};

// Autocomplete songs by name
exports.autocompleteSongs = function(song_name) {
    return schema.models.song.find({
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
