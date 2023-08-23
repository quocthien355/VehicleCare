var express = require('express');
var router = express.Router();
var AuthMiddleware = require('../../middlewares/auth.middleware');
var isAuth = AuthMiddleware.isAuth
/* GET home page. */

router.get('/', isAuth, async (req, res, next) =>{
   
     res.render('home', { title: 'Vehicle Care by Bug Hunter' });
});
module.exports = router;
