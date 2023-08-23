var express = require('express');
var router = express.Router();

const chatController = require('../controllers/ChatController');

router.get('/get-all', function (req, res, next) {
    res.render('chat', { title: 'Chat' });
});
router.post('/send', function (req, res, next) {
    
});
module.exports = router;