var schema = require('./schema.js');

var exports = module.exports = {};

exports.findSimilar = function(start_song, radius) {

};

exports.getDashboard = function() {

};

// Find songs that are similar to a given song title
exports.similarSongs = function(song_id) {
	return schema.models.similar_songs.find({
			song_id: song_id
		}, {
			_id: 0,
			song_id: 0
		})
	.then(function (result) {
		var song_ids = result[0].similar_song_id.map(function(item) {
			return item[0];
		});
		return schema.models.song.find({
			song_id: {
				$in: song_ids
			}
		}).exec();
	});
};

// Find an artist's songs
exports.artistSongs = function(artistName) {
	return schema.models.song.find({
		artist: artistName
	}, {
		_id: 0,
		song_id: 0
	}).exec();
};

// Find an artist's common genres
exports.artistGenres = function(artistName) {
	return schema.models.song.find({
		artist: artistName
	}, {
		_id: 0,
		title: 0
	}).then(function (result) {
		var ids = result.map(function(item) {
			return item.song_id;
		});
		return schema.models.genre.find({
			song_id: {
				$in: ids
			}
		}, {
			_id: 0,
			genre: 1
		}).sort({strength: -1}).limit(10).exec();
	});
};

// Find what a song has been tagged as
exports.songTags = function(songTitle) {
	return schema.models.song.find({
		title: songTitle
	}).exec().then(function (err, result) {
		var id = result[0].song_id;
		return schema.models.tag.find({
			song_id: id
		}, {
			_id: 0,
			song_id: 0
		}).exec();
	});
};

// Find the songs that have been played the most
exports.mostPopularSongs = function(number) {
	return schema.models.user_data.aggregate([
        {
            $group: {
                _id: "$song_id",
                count: { $sum: 1 }
            }
        },
		{
			$sort: {count: -1}
		},
		{
			$limit: number
		},
		{
			$lookup: {
				from: "songs",
				localField: "_id",
				foreignField: "song_id",
				as: "song"
			}
		},
		{
			$project: {
				_id: 0,
				song_id: 1,
				'song.name': 1,
				count: 1
			}
		}
    ]).exec(function (err, users) {
		if (err) throw err;
		return users;
    });
};

// Find songs that have been covered many times
exports.commonlyCoveredSongs = function() {
	return schema.models.covers.aggregate([
        {
            $group: {
                _id: "$cover_group_id",
                count: { $sum: 1 }
            }
        },
		{
			$sort: {count: -1}
		}
    ])
	.then(function(songs) {
		return schema.models.covers.find({
			cover_group_id: songs[0]._id
		})
	})
	.then(function(songs) {
		return schema.models.song.find({
			song_id: songs[0].song_id
		}).exec();
	});
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
    	});
    });
    return songPairs.sort(function(a, b) {
    	return a.count - b.count;
    })
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
        title:  new RegExp(song_name, 'i')
    }, {
		_id: 0,
        song_id: 1,
        title: 1,
		artist: 1
    }).limit(10).exec(function(err, result) {
		return result.map(function (item) {
			item.title = item.title + " - " + item.artist;
		});
	});
};

exports.genres = function() {
    return schema.models.genre.find().lean().exec(function (err, users) {
        return users;
    });
};
