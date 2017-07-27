var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('book/view', { title:'Books' });
});

module.exports = router;
