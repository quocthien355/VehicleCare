var express = require('express');
var router = express.Router();
var AuthMiddleware = require('../../middlewares/auth.middleware');
const { showListCategory, addCategory, updateCategory } = require('../../controllers/ProductCategoryController');
var isAuth = AuthMiddleware.isAuth

router.get('/list-product-categories',isAuth,showListCategory);
router.post('/add-product-category/:name',isAuth,addCategory);

router.post('/edit-product-category/:id/:name',isAuth,updateCategory)

module.exports = router;
