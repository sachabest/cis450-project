var schema = require('./schema.js');

var exports = module.exports = {};

exports.findSimilar = function (start_song, radius) {

};

exports.getDashboard = function () {

};

// Find songs that are similar to a given song title
exports.similarSongs = function (song_id, limit) {
  return schema.models.similar_songs.find({
    song_id: song_id
  }, {
    _id: 0,
    song_id: 0
  })
    .then(function (result) {
      var song_ids = result[0].similar_song_id.map(function (item) {
        return item[0];
      });
      return schema.models.song.find({
        song_id: {
          $in: song_ids
        }
      }).limit(limit).exec();
    });
};

// Find an artist's songs
exports.artistSongs = function (artistName) {
  return schema.models.song.find({
    artist: artistName
  }, {
    _id: 0,
    song_id: 0,
    artist: 0
  }).exec();
};

// Find an artist's common genres
exports.artistGenres = function (artistName) {
  return schema.models.song.find({
    artist: artistName
  }, {
    _id: 0,
    title: 0
  }).then(function (result) {
    var ids = result.map(function (item) {
      return item.song_id;
    });
    return schema.models.genre.aggregate([
      {
        $match: {
          song_id: {
            $in: ids
          }
        }
      },
      {
        $group: {
          _id: "$genre",
          score: {$sum: "$strength"}
        }
      },
      {
        $sort: {score: -1}
      },
      {
        $limit: 10
      }
    ]).exec();
  });
};

// Find what a song has been tagged as
exports.songTags = function (songTitle) {
  return schema.models.song.find({
    title: songTitle
  }).then(function (result) {
    var ids = result.map(function (item) {
      return item.song_id;
    });
    return schema.models.tag.aggregate([
      {
        $match: {
          song_id: {
            $in: ids
          }
        }
      }
    ]).exec();
  }).then(function (result) {
    var results = {};
    for (var i = 0; i < result.length; i++) {
      var song = result[i];
      for (var j = 0; j < song.tags.length; j++) {
        var tag = song.tags[j];
        if (!(tag[0] in results)) {
          results[tag[0]] = 0;
        }
        results[tag[0]] = results[tag[0]] + parseInt(tag[1]);
      }
    }
    var resultsArray = [];
    for (var tag in results)
      resultsArray.push([tag, results[tag]]);
    resultsArray.sort(function (a, b) {
      return b[1] - a[1];
    });
    return resultsArray;
  })
};

// Find the songs that have been played the most
exports.mostPopularSongs = function () {
  return schema.models.users.aggregate([
    {
      $group: {
        _id: "$song_id",
        count: {$sum: 1}
      }
    },
    {
      $sort: {count: -1}
    },
    {
      $limit: 10
    }
  ]).allowDiskUse(true).exec();
};

// Find songs that have been covered many times
exports.commonlyCoveredSongs = function () {
  return schema.models.covers.aggregate([
    {
      $group: {
        _id: "$cover_group_id",
        count: {$sum: 1}
      }
    },
    {
      $sort: {count: -1}
    },
    {
      $limit: 20
    }
  ])
    .then(function (result) {
      var ids = result.map(function (item) {
        return item._id;
      });
      return schema.models.covers.find({
        cover_group_id: {
          $in: ids
        }
      }).exec();
    })
    .then(function (result) {
      var ids = result.map(function (item) {
        return item.song_id;
      });
      return schema.models.song.find({
        song_id: {
          $in: ids
        }
      }).exec();
    });
};

// Find songs that have the most words in common
exports.findCommon = function () {
  return schema.models.words.aggregate([
    {
      $group: {
        _id: "$song_id",
        words: {
          $addToSet: "$word"
        }
      }
    }]).allowDiskUse(true).exec(function (err, songWords) {
    // songWords maps song id to the most popular words contained in that song
    var mostCommon = songWords.map(function (song1) {
      songWords.forEach(function (song2) {
        var words1 = song1.words;
        var words2 = song2.words;
        var intersection = words1.filter(function (word) {
          return words2.indexOf(word) > -1;
        });
        return {
          song1: song1._id,
          song2: song2._id,
          commonWords: intersection.length
        };
      });
    });
    return mostCommon.sort(function (a, b) {
      return a.commonWords - b.commonWords;
    });
  });
};

// Find songs according to a filter
exports.filterSongs = function (filter) {
  return schema.models.song.find(filter, {
    _id: 0,
    title: 1
  }, function (err, result) {
    if (err) throw err;
    return result
  });
};

// Autocomplete songs by name
exports.autocompleteSongs = function (song_name) {
  return schema.models.song.find({
    title: new RegExp(song_name, 'i')
  }, {
    _id: 0,
    song_id: 1,
    title: 1,
    artist: 1
  }).limit(10).exec(function (err, result) {
    return result.map(function (item) {
      item.title = item.title + " - " + item.artist;
    });
  });
};

exports.genres = function () {
  return schema.models.top_genres.find({}, {
    _id: 0
  }).exec();
};
