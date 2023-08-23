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
    update: (product_name, category_id, brand_id, quantity, price, useble_km,date_of_manufacture,expity_date,description, id) => {
      
        const query = `UPDATE product SET name = ?, id_product_category = ?, id_brand = ?,quantity=? ,price=?, useble_km=?,  mfg = ?, exp = ?, 
         description = ? WHERE id_product = `+id;
        return new Promise((resolve, reject) => {
            con.query(query,[product_name, category_id, brand_id, quantity, price, useble_km,date_of_manufacture,expity_date,description],(error, results) => {
                if (error) { reject(error); }
                resolve(results);
            });
        });
    },
    deleteProduct: (id, callback) => {
        const query = 'DELETE FROM product WHERE id_product = ?'
        return con.query(query, [id], callback);
    },
    getById: (id,) => {
        const query = 'SELECT id_product, p.name, mfg,exp,useble_km,p.id_brand,p.id_product_category,price,quantity,description, c.name as category ,b.name as brand FROM product p INNER JOIN product_category c ON c.id_product_category=p.id_product_category INNER JOIN product_brand b ON b.id_product_brand= p.id_brand WHERE id_product = ' + id;
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
