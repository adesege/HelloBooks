var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('book/category/add', { title:'Add category' });
});

module.exports = router;
