var express = require('express');
var router = express.Router();

var db = require('../public/javascripts/db.js');

/* GET latest images page. */
router.get('/', function(req, res, next) {
	db.getSearches(function (val) {
		res.render('latest', {
			title: 'Latest Searches',
			results: val.body
		})
	})
});

module.exports = router;
