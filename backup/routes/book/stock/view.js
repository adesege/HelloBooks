var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('book/stock/view', { title:'Stock Management' });
});

module.exports = router;
