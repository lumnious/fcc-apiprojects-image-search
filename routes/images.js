var express = require('express');
var router = express.Router();

var search = require('../public/javascripts/search.js');
var db = require('../public/javascripts/db.js');

/* GET images page. */
router.get('/:query', function(req, res, next) {
	var searchResult = [];
	search.searchImages(req.params.query, req.query.offset || 0, function (val) {
		if(val.response === 0) {
			val.body.forEach(function(item) {
				searchResult.push({
					'imageName': item.name,
					'imageURL': item.contentUrl,
					'imageInfo':
					{
						'size': item.contentSize,
						'format': item.encodingFormat,
						'width': item.width,
						'height': item.height,
					},
					'hostpage': decodeURIComponent(item.hostPageUrl.split('&r=')[1]).split('&p=')[0],
					'thumbnailUrl': item.thumbnailUrl,
					'thumbnailInfo':
					{
						'width': item.thumbnail.width,
						'height': item.thumbnail.height
					}
				})
			})
			var now = new Date();
			db.recordSearch(req.params.query, val.url, now, function (result) {
				res.render('images', {
					title: 'Image Search',
					results: searchResult});
				//res.send(searchResult)
			})
		}
	});

});

module.exports = router;