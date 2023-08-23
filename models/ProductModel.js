var con = require('../helpers/config');
const Product = {
    create: (name, id_product_category, id_brand, mfg, exp, useble_km, quantity, price, description) => {

        const sql = 'INSERT INTO product (name, id_product_category, id_brand, mfg, exp, useble_km,quantity, price, description) VALUES (?,?,?,?,?,?,?,?,?)';
        return new Promise((resolve, reject) => {
            con.query(sql, [name, id_product_category, id_brand, mfg, exp, useble_km, quantity, price, description], (error, results) => {
                if (error) { reject(error); }
                resolve(results);
            });
        });
    },
    updateProduct: (id, product, callback) => {
        const { name, category, brand, mfg, exp, useble_km, price, status, description, image } = product;
        const query = `UPDATE product SET name = ?, category = ?, brand = ?, mfg = ?, exp = ?, 
        useble_km = ?, price = ?, status = ?, description = ?, image = ? WHERE id_product = ?`;
        const values = [name, category, brand, mfg, exp, useble_km, price, status, description, image, id];
        return con.query(query, values, callback);
    },
    deleteProduct: (id, callback) => {
        const query = 'DELETE FROM product WHERE id_product = ?'
        return con.query(query, [id], callback);
    },
    getById: (id,) => {
        const query = 'SELECT id_product, p.name, mfg,exp,useble_km,price,quantity,description, c.name as category ,b.name as brand FROM product p INNER JOIN product_category c ON c.id_product_category=p.id_product_category INNER JOIN product_brand b ON b.id_product_brand= p.id_brand WHERE id_product = ' + id;
        return new Promise((resolve, reject) => {
            con.query(query, (error, results) => {
                if (error) { reject(error); }
                resolve(results);
            });
        });
    },
    getAll: () => {
        const query = `SELECT p.id_product,p.name,price,quantity,mfg,exp,useble_km,description ,i.url as image ,c.name as category,b.name as brand,c.id_product_category as id_product_category, b.id_product_brand as id_product_brand FROM product p INNER JOIN image_products i ON p.id_product=i.id_product INNER JOIN product_category c ON c.id_product_category=p.id_product_category INNER JOIN product_brand b ON b.id_product_brand=p.id_brand GROUP BY id_product`;
        return new Promise((resolve, reject) => {
            con.query(query, (error, results) => {
                if (error) { reject(error); }
                resolve(results);
            });
        });
    }
};

module.exports = Product;
