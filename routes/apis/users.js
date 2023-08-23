var express = require('express');
var router = express.Router();
var userController = require('../../controllers/UserController');

router.get('/', function(req, res, next) {
  res.render('user-list');
});

router.post('/register', userController.register);
router.post('/login', userController.login);
router.post('/update/:id', userController.updateUser);
router.get('/get-user/:id', userController.getOneUser);
router.get('/check-user', userController.checkUser);
module.exports = router;
