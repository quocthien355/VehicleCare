const bcrypt = require('bcrypt');
var conn = require('../helpers/config');
var db = require('../helpers/database');
const TABLENAME = 'cart_detail';


exports.createCartDetail = (cartDetail) => {
    try {

        return new Promise((resolve, reject) => {
            conn.query('INSERT INTO ' + TABLENAME + ' SET ?', cartDetail, (error, results) => {
                if (error) { reject(error); }
                resolve(results);
            });
        });
    } catch (error) {
        console.log("lỗi : " + error.message);
        return false;
    }

};
exports.getCartDetail = (id_cart, id_product) => {
    try {
        return new Promise((resolve, reject) => {
            conn.query('SELECT * FROM ' + TABLENAME + ' WHERE id_cart = ? AND id_product=?', [id_cart, id_product], (error, results) => {
                if (error) {
                    reject(error);
                }
                resolve(results);
            });
        })
    } catch (error) {
        console.log("lỗi : " + error.message);
        return null;
    }
};