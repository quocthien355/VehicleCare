var express = require('express');
var router = express.Router();
var ProductController = require('../../controllers/ProductController');

router.get('/detail-product/:id', ProductController.getProductById);
router.get('/get-all-product',ProductController.getAllProduct);
module.exports = router;