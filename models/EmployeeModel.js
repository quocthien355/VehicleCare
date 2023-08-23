const bcrypt = require('bcrypt');
var conn = require('../helpers/config');
var db = require('../helpers/database');
const TABLENAME = 'employee';
exports.getEmployee = (number_phone) => {
    try {
        return new Promise((resolve, reject) => {
            conn.query('SELECT * FROM ' + TABLENAME + ' WHERE number_phone = ' + number_phone, (error, results) => {
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
exports.createEmployee = (employee) => {
    try {

        return new Promise((resolve, reject) => {
            conn.query('INSERT INTO ' + TABLENAME + ' SET ?', employee, (error, results) => {
                if (error) { reject(error); }
                resolve(results);
            });
        });
    } catch (error) {
        console.log("lỗi : " + error.message);
        return false;
    }

};
exports.updateRefreshToken = async (number_phone, refreshToken) => {
    try {
        var sql = "UPDATE " + TABLENAME + " SET token = '" + refreshToken + "' WHERE number_phone = '" + number_phone + "'";
        return new Promise((resolve, reject) => {
            conn.query(sql, (error, results) => {
                if (error) reject(error);

                resolve(results);
            });
        });
    } catch (error) {
        console.log("lỗi : " + error.message);
        return false;
    }
};
// exports.updateAccessToken = async (number_phone, accessToken) => {
//     try {
//         return new Promise((resolve, reject) => {
//             conn.query("UPDATE "+TABLENAME+" SET access_token = "+accessToken+" WHERE number_phone = "+number_phone,  (error, results) => {
//                 if (error) reject(error);
//                 resolve(results);
//             });
//         });
//     } catch (error) {
//         console.log("lỗi : " + error.message);
//         return false;
//     }
// };