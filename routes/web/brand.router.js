var express = require('express');
var router = express.Router();
var AuthMiddleware = require('../../middlewares/auth.middleware');
const { showListBrand, addBrand, updateBrand } = require('../../controllers/BrandController');
var isAuth = AuthMiddleware.isAuth

router.get('/list-product-brands',isAuth,showListBrand)
router.post('/add-product-brand/:name',isAuth, addBrand)
router.post('/edit-product-brand/:id/:name',isAuth, updateBrand)

module.exports = router;
