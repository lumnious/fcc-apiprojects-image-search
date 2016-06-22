var express = require('express');
var router = express.Router();

var search = require('../public/javascripts/search.js');

/* GET images page. */
router.get('/:val', function(req, res, next) {
	search.searchImages('cats', 10, function (val) {
		 res.send(val);
	});

});

module.exports = router;