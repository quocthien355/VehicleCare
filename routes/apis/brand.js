var express = require('express');
var router = express.Router();
var AuthMiddleware = require('../../middlewares/auth.middleware');
const { showListBrand, addBrand, updateBrand, getAllBrand } = require('../../controllers/BrandController');
var isAuth = AuthMiddleware.isAuth

router.get('/get-all-brand',getAllBrand)

module.exports = router;
