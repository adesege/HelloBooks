var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('book/history/view', { title:'View history' });
});

module.exports = router;
