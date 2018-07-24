var express = require('express');
var router = express.Router();

/* GET demo functionality. */
router.get('/', function(req, res, next) {
  res.render('demo', {title: 'Product Demo'});
});

module.exports = router;