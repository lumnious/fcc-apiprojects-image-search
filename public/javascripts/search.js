var request = require('request');
var url = 'https://bingapis.azure-api.net/api/v5/images/search';
var countImages = 10

var exports = module.exports = {};

exports.searchImages = function (query, offset, callback) {
	var searchURL = url + '?q=' + query + '&count=' + countImages + '&offset=' + offset;
	searchURL = encodeURI(searchURL);
	var options = {
		url:searchURL,
		json:true,
		headers: {
			'Host': 'bingapis.azure-api.net',
			'Ocp-Apim-Subscription-Key': 'd253a8040f954f93a4fa357791eacd65'
		}
	}

	request(options, function (err, res, body) {
		 if (err) {
		 	console.log({'response': -1, 'body': 'Unable to fetch images.'});
		 	callback({'response': -1, 'body': 'Unable to fetch images.'});
		 } else {
		 	console.log(body.value);
		 	callback(body.value);
		 }
	})
}