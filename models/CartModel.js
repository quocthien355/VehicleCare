const bcrypt = require('bcrypt');
var conn = require('../helpers/config');
var db = require('../helpers/database');
const TABLENAME = 'cart';

exports.createCart = (cart) => {
    try {

        return new Promise((resolve, reject) => {
            conn.query('INSERT INTO ' + TABLENAME + ' SET ?', cart, (error, results) => {
                if (error) { reject(error); }
                resolve(results);
            });
        });
    } catch (error) {
        console.log("lỗi : " + error.message);
        return false;
    }

};
exports.getCartById = (id_cart) => {
    try {
        // console.log({id_cart});
        return new Promise((resolve, reject) => {
            conn.query('SELECT * FROM ' + TABLENAME + ' WHERE id_cart = ?', id_cart, (error, results) => {
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
exports.updateCart = (rate, feedback, id_user, id_cart) => {
    try {
        // console.log({id_cart});
        return new Promise((resolve, reject) => {
            conn.query('UPDATE ' + TABLENAME + ' SET rate= ? ,feedback= ? WHERE id_cart=? AND id_user=?', [rate, feedback, id_cart, id_user], (error, results) => {
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
}