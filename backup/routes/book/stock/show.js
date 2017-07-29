var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/book/stock/:stockID', function(req, res, next) {
  res.render('book/stock/show', { title:'Viewing a stock' });
});

module.exports = router;
