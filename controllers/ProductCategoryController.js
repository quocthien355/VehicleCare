const e = require('express');
const ProductCategory = require('../models/ProductCategoryModel');
exports.createProductCategory = async (req, res) => {
    try {
        const { name } = req.params;
        if (name) {
            const result = await ProductCategory.create(name);
            if (!result.insertId) {
                return res.status(500).json({
                    status: false,
                    message: 'Create product fail !!',

                });
            } else {
                return res.json({
                    status: true,
                    message: 'Create product success!!',
                    data: {
                        brand_id: result.insertId
                    }

                });
            }
        }
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            status: false,
            message: 'Create product fail !!',

        });
    }
}

exports.getAllProductCategory = async (req, res) => {
    try {
        const categories = await ProductCategory.getAll()
        if (!categories) {
            res.status(400).json({
                status: false,
                message: 'Get ok!!',
                data: {
                    brands
                }
                ,
            });
        } else {
            res.json({
                status: true,
                message: 'Get ok!!',
                data: {
                    categories
                }
                ,
            });
        }
    } catch (err) {
        console.log(err);
    }
}

module.exports.showListCategory = async (req, res, next) => {
    try {
        const categories = await ProductCategory.getAll();
        res.render('list_product_categories', { categories })
    } catch (error) {
        console.log(error.message);
        res.render('list_product_categories')
    }
}

module.exports.updateCategory = async (req, res, next) => {
    try {
        const { id, name } = req.params;
        const result = await ProductCategory.update(id, name);

        if (!result) {

            return res.json({
                status: false,
                message: 'Update Category fail !!',

            });
        } else {
            return res.json({
                status: true,
                message: 'Update Category success!!',
                data: {
                    category_id: result.insertId
                }

            });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: false,
            message: error.message,

        });
    }

}
module.exports.addCategory = async (req, res, next) => {
    try {
        const { name } = req.params;
        if (name) {
            const result = await ProductCategory.create(name);
            if (!result.insertId) {

                return res.json({
                    status: false,
                    message: 'Create product fail !!',

                });
            } else {
                return res.json({
                    status: true,
                    message: 'Create product success!!',
                    data: {
                        brand_id: result.insertId
                    }

                });
            }

        } else {
            return res.status(400).json({
                status: false,
                message: 'Field product name  is null !!',

            });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: false,
            message: error.message,

        });
    }

}