var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('book/borrow/view', { description: 'HelloBooks is a simple application that helps manage a library and its processes like stocking, tracking and renting books.', title:'HelloBooks' });
});

module.exports = router;
