var express = require('express');
var router = express.Router();
var ProductCategoryController = require('../../controllers/ProductCategoryController');

router.get('/get-all-category', ProductCategoryController.getAllProductCategory);
module.exports = router;