var express = require('express');
const Product = require('../db/models/product-schema');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.json({api:'back' });
});


module.exports = router;
