var con = require('../helpers/config');
const ProductCategory = {
    create: (name) => {
        const query = 'INSERT INTO product_category (name) VALUES (?)';
        return new Promise((resolve, reject) => {
            con.query(query, [name], (error, results) => {
                if (error) { reject(error); }
                resolve(results);
            });
        });
    },
    update: (id, name) => {
        const query = `UPDATE product_category SET name = ? WHERE id_product_category = ` + id;
        return new Promise((resolve, reject) => {
            con.query(query, [name], (error, results) => {
                if (error) { reject(error); }
                resolve(results);
            });
        });
    },
    getAll: () => {
        const query = `SELECT * FROM product_category`;
        return new Promise((resolve, reject) => {
            con.query(query, (error, results) => {
                if (error) { reject(error); }
                resolve(results);
            });
        });
    }
}
module.exports = ProductCategory;