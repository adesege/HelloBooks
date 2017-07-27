var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('book/category/view', { title:'Book categories' });
});

module.exports = router;
