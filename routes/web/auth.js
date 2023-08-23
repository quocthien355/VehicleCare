var express = require('express');
var router = express.Router();

const EmployeeController = require('../../controllers/EmployeeController');
var AuthMiddleware = require('../../middlewares/auth.middleware');
var isAuth = AuthMiddleware.isAuth

router.get('/login', function(req, res, next) { 
  res.render('login', {layout:'other', error: req.cookies.error });
  res.clearCookie("error")
});
router.get('/forgot-password', function(req, res, next) {
  res.render('forgot-password');
});
router.post('/register', EmployeeController.register);

router.post('/login', EmployeeController.login)

router.get('/logout',isAuth, EmployeeController.logout)


module.exports = router;
