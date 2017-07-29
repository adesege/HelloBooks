var express = require('express');
var router = express.Router();

/* GET home page. */
router.route('/')
  .get(function(req, res, next) {
  res.render('dashboard/dashboard', { title: 'Your dashboard'});
}).post(function(req, res, next) {

});

module.exports = router;
