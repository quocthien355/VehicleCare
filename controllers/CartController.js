const e = require('express');
const CartModel = require('../models/CartModel');
const ProductController = require("../controllers/ProductController")
const Time = require('../helpers/time')
exports.createCart = async (req, res) => {
    try {
        const cart = req.body;
        const dateTime = Time.getCurrentDateTimeString();
        const date = Time.getDate()
        // console.log(">>>>>>"+dateTime);
        // console.log({cart})
        const newCart = {
            "time": dateTime,
            "current_km": cart.current_km,
            "mfg": date,
            "exp": date,
            "useable_km": 2000,
            "customer_locate": "customer_locate",
            "status": "đã đặt hàng",
            "rate": cart.rate,
            "feedback": cart.feedback,
            "id_centre": cart.id_centre,
            "id_user": cart.id_user,
            "id_employee": cart.id_employee
        }
        console.log({ newCart });
        // return res.status(400).json({ error: 'Không được để trống dữ liệu' });

        const createCart = await CartModel.createCart(newCart);

        if (!createCart) {
            console.error('Đã có lỗi xảy ra:', error);
            res.status(500).json({ error: 'Đã xảy ra lỗi!' });
        } else {
            res.status(201).json({
                message: 'Tạo cart thành công!',
                data: {
                    cart: newCart
                }
            });
        }

    } catch (err) {
        console.log(err);
    }
}
exports.getCartById = async (req, res) => {
    try {
        const { id_cart } = req.params
        if (!id_cart) {
            res.status(401).json({ message: "nhập thiếu dữ liệu!!!" })
        } else {
            // console.log({ id_cart });
            let cart = await CartModel.getCartById(id_cart);
            cart = await JSON.parse(JSON.stringify(cart))

            if (cart) {
                res.json({
                    message: "lấy thành công!!!",
                    data: {
                        cart
                    }
                })
            } else {
                res.status(404).json({
                    message: "Không tìm thấy"
                })
            }
        }
    } catch (error) {
        console.log(error);
    }
}
exports.feedbackCart = async (req, res) => {
    try {
        const { id_cart, id_user } = req.params
        const { rate, feedback } = req.body
        if (!id_cart || !id_user || !rate || !feedback) {
            res.status(401).json({ message: "nhập thiếu dữ liệu!!!" })
        } else {
            const updatedCart = await CartModel.updateCart(rate, feedback, id_user, id_cart);
            if (!updatedCart) {
                res.status(401).json({
                    message: " feedback lỗi, thử lại!!!"
                })
            } else {
                res.json({
                    message: "feedback thành công!!!"
                })
            }
        }
    } catch (error) {
        console.log(error);
    }
}