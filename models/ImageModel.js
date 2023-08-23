var con = require('../helpers/config');
const { initializeApp } = require('firebase/app')
const { ref, getDownloadURL, uploadBytesResumable } = require('firebase/storage');

const { firebaseConfig, storage } = require('../helpers/firebaseConfig');

//Initialize a firebase application
initializeApp(firebaseConfig);

module.exports.getOneImageForAllProduct = () => {

    const sql = '  SELECT * FROM image_products GROUP BY id_product;'
    return new Promise((resolve, reject) => {
        con.query(sql, (error, results) => {
            if (error) { reject(error); }
            resolve(results);
        });
    });
}
module.exports.addImage = (url, id_product) => {

    const sql = 'INSERT INTO image_products (url,id_product) VALUES(?,?); '

    return new Promise((resolve, reject) => {
        con.query(sql, [url, id_product], (error, results) => {
            if (error) { reject(error); }
            resolve(results);
        });
    });

}
module.exports.getAllImage = () => {
    const sql = 'SELECT*FROM image_products;'

    return new Promise((resolve, reject) => {
        con.query(sql, (error, results) => {
            if (error) { reject(error); }
            resolve(results);
        });
    });
}

module.exports.getImageByIdProduct = (id) => {
    const sql = 'SELECT *FROM image_products WHERE id_product=?;'

    return new Promise((resolve, reject) => {
        con.query(sql, id, (error, results) => {
            if (error) { reject(error); }
            resolve(results);
        });
    });
}
module.exports.uploadImage = async (file) => {
    const time = Date.now()
    // console.log(file);
    const storageRef = ref(storage, "images/" + time + "-" + file.originalname);
    const metadata = {
        contentType: file.mimetype,
    };
    // Upload the file in the bucket storage
    // console.log('Array:', file.buffer);

    const snapshot = await uploadBytesResumable(
        storageRef,
        file.buffer,
        metadata
    );
    // Grab the public url
    return await getDownloadURL(snapshot.ref);

}