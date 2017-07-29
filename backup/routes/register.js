var express = require('express');
var router = express.Router();

/* GET home page. */
router.route('/')
  .get(function(req, res, next) {
  res.render('register', { title: 'Create an account', description:'HelloBooks is a simple application that helps manage a library and its processes like stocking, tracking and renting books.', reg_text:'It takes less than 30 seconds to create an account. We just need some little details from you.', style_class: 'bg-books' });
}).post(function(req, res, next) {

});

module.exports = router;
