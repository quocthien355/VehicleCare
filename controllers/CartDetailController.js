const e = require('express');
const CartDetailModel = require("../models/CartDetailModel");
exports.createCartDetail = async (req, res) => {
    try {
        const cartDetail = req.body;
        const createCartDetail = await CartDetailModel.createCartDetail(cartDetail);
        if (!createCartDetail) {
            res.status(401).json({
                message: "tạo lỗi, thử lại!!!"
            })
        } else {
            res.json({
                message: "Tạo thành công!!!",

            })
        }

    } catch (err) {
        console.log(err);
    }
}