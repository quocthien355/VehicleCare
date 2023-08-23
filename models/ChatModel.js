const config = require('../helpers/config');
module.exports = {
    getChat: function (req, res) {
        var sql = "SELECT * FROM chat";
        config.query(sql, function (err, result) {
            if (err) {
                res.json({ "status": 400, "message": "Error", "Error": err });
            } else {
                res.json({ "status": 200, "message": "Success", "result": result });
            }
        });
    },
    getChatDetail: function (req, res) {
        var sql = "SELECT * FROM chat WHERE id = ?";
        config.query(sql, [req.params.id], function (err, result) {
            if (err) {
                res.json({ "status": 400, "message": "Error", "Error": err });
            } else {
                res.json({ "status": 200, "message": "Success", "result": result });
            }
        });
    },
    saveMessage: function (req, res) {
        var sql = "INSERT INTO chat (message, sender, receiver, created_at) VALUES (?, ?, ?, ?)";
        config.query(sql, [req.body.message, req.body.sender, req.body.receiver, req.body.created_at], function (err, result) {
            if (err) {
                res.json({ "status": 400, "message": "Error", "Error": err });
            } else {
                res.json({ "status": 200, "message": "Success", "result": result });
            }
        });
    }
}