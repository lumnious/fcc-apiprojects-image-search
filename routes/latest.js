var express = require('express');
var router = express.Router();

var db = require('../public/javascripts/db.js');

/* GET latest images page. */
router.get('/', function(req, res, next) {
	db.getSearches(function (val) {
		res.send(val);
	})
});

module.exports = router;
