var express = require('express');
var router = express.Router();

/* GET home page. */
router.route('/')
  .get(function(req, res, next) {
  res.render('reset-password', { title: 'Password reset', description:'Having trouble signing in to your account? Provide the email address you used to register and we will send you a password reset link', style_class: 'bg-books' });
}).post(function(req, res, next) {

});

module.exports = router;
