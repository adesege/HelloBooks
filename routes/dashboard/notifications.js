var express = require('express');
var router = express.Router();

router.route('/notifications')
  .get(function(req, res, next) {
  res.render('dashboard/notifications', { title: 'Your notifications'});
}).post(function(req, res, next) {

});

module.exports = router;
