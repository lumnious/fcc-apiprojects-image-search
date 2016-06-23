var MongoClient = require('mongodb').MongoClient;

var url = process.env.MONGODB_URI || 'mongodb://localhost:27017/imageSearch';
var prj = {_id: 0, 'query': 1, 'dateTime': 1};

var exports = module.exports = {};


exports.getSearches = function (callback) {
	MongoClient.connect(url, function (err, db) {
		if (err) {
			callback({'response': -1, 'body': 'Failed to connect to server'});
		}	else {
			console.log('Connected correctly to server');
			db.collection('searches').find({}, prj).sort({time:-1}).limit(10).toArray(function (err, docs) {
				if (err) {
					callback({'response': -1, 'body': 'Unable to recover latest searches'});
				} else if (docs.length > 0) {
					db.close();
					callback({'response': 0, 'body': docs});
				} else {
					db.close();
					callback({'response': 1, 'body': 'No previous searches recorded'});
				}
			});
		}
	});
};

exports.recordSearch = function (query, searchurl, date, callback) {
	MongoClient.connect(url, function (err, db) {
		if (err) {
			callback({'response': -1, 'body': 'Unable to save search, failed to connect to database'});
		} else {

			db.collection('searches').count({}, function (err, count) {
				if(count === 0) {
					db.createCollection('searches', {capped: true, size: 2000000, max: 50}, function (err) {
						if (err) {
							db.close();
							callback({'response': -1, 'body': 'Unable to save search, failed to create collection'});
						} else {
							console.log('Capped collection created');
							db.collection('searches').insertOne({'query': query, 'searchurl': searchurl, 'dateTime': date}, function (err) {
								if (err) {
									console.log(err);
									db.close();
									callback({'response': -1, 'body': 'Unable to save search, failed to write to database'});
								} else {
									db.close();
									callback({'response': 0, 'body': 'Search saved successfully'});
								}
							});
						}
					});
				} else {
					db.collection('searches').insertOne({'query': query, 'searchurl': searchurl, 'dateTime': date}, function (err) {
						if (err) {
							console.log(err)
							db.close();
							callback({'response': -1, 'body': 'Unable to save search, failed to write to database'});
						} else {
							db.close();
							callback({'response': 0, 'body': 'Search saved successfully'});
						}
					});
				}
			});
		}
	});
};
