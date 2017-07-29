var express = require('express');
var router = express.Router();

/* GET home page. */
router.route('/settings')
  .get(function(req, res, next) {
  res.render('dashboard/settings', { title: 'Settings'});
}).post(function(req, res, next) {

});

module.exports = router;
