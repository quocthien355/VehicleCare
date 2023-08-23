var con = require('../helpers/config');
const Brand = {
    add: (name) => {

        const query = "INSERT INTO product_brand  ( name) values ( ? ); ";
        return new Promise((resolve, reject) => {
            con.query(query, name, (error, results) => {
                if (error) { reject(error); }
                resolve(results);
            });
        });
    },


    getAll: () => {

        const query = 'SELECT id_product_brand,name FROM product_brand ';
        return new Promise((resolve, reject) => {
            con.query(query, (error, results) => {
                if (error) { reject(error); }
                resolve(results);
            });
        });


    },

    update: (id, name) => {

        const query = "UPDATE  product_brand SET name = ? WHERE id_product_brand = " + id
        return new Promise((resolve, reject) => {
            con.query(query, [name], (error, results) => {
                if (error) { reject(error); }
                resolve(results);
            });
        });
    },

    getBrandById: (id, callback) => {

        const query = "SELECT * FROM product_brand WHERE id_product_brand = " + id
        return con.query(query, callback);


    }
}

module.exports = Brand;