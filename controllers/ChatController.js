const ChatModel = require('../models/ChatModel');
const io = require('../bin/www');
module.exports = {
    getAllListChat: (req, res, next) => {
        ChatModel.getAllListChat(req, res, next);
    },
    getListChatById: (req, res, next) => {
        ChatModel.getListChatById(req, res, next);
    },
    createChat: (req, res, next) => {
        ChatModel.createChat(req, res, next);
    },
    sendChat: (req, res, next) => {
        ChatModel.sendChat(req, res, next);
        io.emit('chat', req.body);
    }
}