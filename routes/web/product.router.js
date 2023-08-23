var express = require('express');
var router = express.Router();
var AuthMiddleware = require('../../middlewares/auth.middleware');
const { showListProducts, showFormAddProduct, addProduct, editProduct, showEditProduct, showProduct,   } = require('../../controllers/ProductController');
const upload = require('../../middlewares/upload.middeware');
var isAuth = AuthMiddleware.isAuth

router.get('/list-products',isAuth, showListProducts)

router.get('/add-product',isAuth, showFormAddProduct)

router.post('/add-product',isAuth, [upload.array('images', 12)], addProduct);

router.get('/edit-product/:id',isAuth,showEditProduct );


router.get('/view-product/:id',isAuth,showProduct );

router.put('/edit-product/:id',isAuth, [upload.array('images', 12)],editProduct );
module.exports = router;
