var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.send('Specify a resource in the URL');
});

module.exports = router;
