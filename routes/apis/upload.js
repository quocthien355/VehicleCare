var express = require('express');
var router = express.Router();
const middleware = require('../../middlewares/upload');
const host = require('../../helpers/host')

router.post('/images',[middleware.single('image')], function (req, res, next) {
    try{
        let {file} = req;
        let image = host + "/uploads/images/users" + file.filename;
        res.status(200).json({image})
    }catch(err){
        res.status(500).json({message:err.message})
    }
})
module.exports = router;