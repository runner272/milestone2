var express = require('express');
var router = express.Router();

/* GET home page. */
var til = [];
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Today I Learned', til: til});

});

module.exports = router;
