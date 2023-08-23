const Product = require('../models/ProductModel');
const Brand = require('../models/BrandModel');
const Category = require('../models/ProductCategoryModel');
const { getOneImageForAllProduct } = require('../models/ImageModel');
const { watch } = require('fs-extra');
const { getAllImage, addImage, uploadImage, getImageByIdProduct } = require("../models/ImageModel")
const formmatCurrencyToVND = require('../helpers/formatCurrency');
const { log } = require('util');
exports.create = async (req, res) => {
  try {
    const { name, category, brand, mfg, exp, useble_km, price, description } = req.body;
    const result = await Product.create(name, category, brand, mfg, exp, useble_km, price, description);

  } catch (err) {
    console.log(err);
    res.status(500).json(
      {
        "error": err.message
      }
    )
  }
}
exports.updateProduct = (req, res) => {
  try {
    const { id } = req.params;
    const { name, category, brand, mfg, exp, useble_km, price, status, description, image } = req.body;
    if (!name || !category || !brand || !mfg || !exp || !useble_km || !price || !status || !image) {
      return res.status(400).json({ error: 'Không được để trống dữ liệu' });
    }
    const product = { name, category, brand, mfg, exp, useble_km, price, status, description, image };
    Product.updateProduct(id, product, (error, result) => {
      if (error) {
        console.error('Có lỗi khi update sản phẩm:', error);
        res.status(500).json({ error: 'Lỗi server' });
      } else {
        res.json({ message: 'Update sản phẩm thành công!' });
      }
    });
  } catch (error) {
    console.error('Có lỗi khi update sản phẩm:', error);
  }

};
exports.deleteProduct = (req, res) => {
  try {
    const { id } = req.params;
    Product.deleteProduct(id, (error, result) => {
      if (!error) {
        res.json({ message: 'Xóa sản phẩm thành công!' });
      } else {
        console.error('Có lỗi khi xóa sản phẩm:', error);
        res.status(500).json({ error: 'Lỗi server' });
      }
    });
  } catch (err) {
    console.log(err);
  }
}

exports.getProductById = (req, res) => {
  try {
    const { id } = req.params;
    Product.getProductById(id, (error, result) => {
      if (!error) {
        if (result.length > 0) {
          res.json(result);
        } else {
          res.json({ message: 'Không có sản phẩm nào!' });
        }
      } else {
        console.error('Có lỗi khi lấy sản phẩm:', error);
        res.status(500).json({ error: 'Lỗi server' });
      }
    });
  } catch (err) {
    console.log(err);
  }
}
exports.getAllProduct = async (req, res) => {

  try {
    let products = await Product.getAll();

    if (products) {
      res.status(200).json({
        products
      })
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: err.message
    })
  }
}

module.exports.showProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    let product = await Product.getById(id);
    const images = await  getImageByIdProduct(id);
    console.log(product);
    const formatPrice = (val) => {
        return val.toLocaleString('it-IT', { style: 'currency', currency: 'VND' });
    }
    res.render('view_product', { layout: 'main.hbs', product: product[0], images, image: images[0], price: formatPrice(product[0].price) });



     } catch (error) {
  console.log(error.message);
  res.render('view_product');
}
}
module.exports.showListProducts = async (req, res, next) => {
  try {
    let products = await Product.getAll();
    if (products) {
      console.log(products);
      res.render('list_products', { layout: 'main.hbs', products })
    } else {
      res.render('list_products', { layout: 'main.hbs' })
    }

  } catch (error) {
    console.log(error.message);
    res.render('list_products', { layout: 'main.hbs' })
  }
}

module.exports.showFormAddProduct = async (req, res, next) => {
  try {
    const brands = await Brand.getAll();
    const categories = await Category.getAll()
    res.render('add_product', { layout: 'main.hbs', brands, categories })
  } catch (error) {
    console.log(error.message);
    res.render('add_product', { layout: 'main.hbs' })
  }
}

module.exports.addProduct = async (req, res, next) => {
  try {
    const product = await JSON.parse(JSON.stringify(req.body));
    console.log(product);
    const result = await Product.create(product.product_name, product.category_id, product.brand_id, product.date_of_manufacture, product.expity_date, product.useble_km, product.quantity, product.price, product.description);
    console.log(result.insertId);
    if (result) {
      // add images
      const { files } = req;
      if (files.length > 0) {
        // console.log(files);
        let image_urls = [];
        files.forEach(async file => {
          const url = await uploadImage(file)

          await addImage(url, result.insertId);
          image_urls.push({ url: url });
        });
        console.log(image_urls);
        res.status(200).json({
          status: true,
          message: "Add product success!!!"
        })
      }
    } else {
      res.status(400).json({
        status: false,
        message: "Add product fail!!!"
      })
    }





  } catch (error) {
    console.log(">>ERROR:::::::::" + error.message);
    res.status(500).json({
      status: false,
      message: error.message
    })
  }
}


module.exports.editProduct = async (req, res, next) => {
  try {
    //add product
    const product = await JSON.parse(JSON.stringify(req.body));
    const { id } = req.params;

    const result = await editProduct(product.product_name, product.price, product.description, product.quantity, product.category_id, product.brand_id, id);

    if (result) {
      // add images
      const { files } = req;
      if (files.length > 0) {
        // console.log(files);
        let image_urls = [];
        files.forEach(async file => {
          const url = await uploadImage(file)

          await addImage(url, id);
          image_urls.push({ url: url });
        });
        console.log(image_urls);
        res.status(200).json({
          status: true,
          message: "edit product success!!!"
        })
      } else {
        res.status(200).json({
          status: true,
          message: "edit product success!!!"
        })
      }
    } else {
      res.status(400).json({
        status: false,
        message: "edit product fail!!!"
      })
    }




  } catch (error) {
    console.log(">>ERROR:::::::::" + error.message);
    res.status(500).json({
      status: false,
      message: error.message
    })
  }
}
module.exports.showEditProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const categories = await Category.getAll();
    const brands = await Brand.getAll();
    const product = await Product.getById(id);
    const images= await getImageByIdProduct(id);
    // console.log(product);
    // console.log(categories);
    // console.log(brands);

    res.render('edit_product', { layout: 'main.hbs', product: product[0], brands, categories,images });

  } catch (error) {
    console.log(error.message);

  }
}
