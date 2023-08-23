var express = require('express');
var router = express.Router();
var CartDetailController = require('../../controllers/CartDetailController');

router.post('/create-cart-detail', CartDetailController.createCartDetail);
// router.post('/update-pc/:id', ProductCategoryController.updateProductCategory);
// router.delete('/delete-pc/:id', ProductCategoryController.deleteProductCategory);
// router.get('/get-all-pc', ProductCategoryController.getAllProductCategory);
module.exports = router;