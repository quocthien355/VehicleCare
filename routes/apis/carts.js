var express = require('express');
var router = express.Router();
var CartController = require('../../controllers/CartController');

router.post('/create-cart', CartController.createCart);
router.get('/get-cart-by-id/:id_cart', CartController.getCartById);
router.post('/feedback-cart/:id_user/:id_cart',CartController.feedbackCart);
// router.post('/update-pc/:id', ProductCategoryController.updateProductCategory);
// router.delete('/delete-pc/:id', ProductCategoryController.deleteProductCategory);
module.exports = router;