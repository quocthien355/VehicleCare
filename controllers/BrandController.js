const e = require("express");

const Brand = require("../models/BrandModel");


module.exports.addBrand = async (req, res, next) => {
    try {
        const { name } = req.params;
        if (name) {
            const result = await Brand.add(name);
            if (!result.insertId) {
              
                return res.json({
                    status: false,
                    message: 'Create brand fail !!',

                });
            } else {
                return res.json({
                    status: true,
                    message: 'Create brand success!!',
                    data: {
                        brand_id: result.insertId
                    }

                });
            }

        } else {
            return res.status(400).json({
                status: false,
                message: 'Field brand_name  is null !!',

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
module.exports.getAllBrand = async (req, res, next) => {
    try {

        const brands = await Brand.getAll()
        if (!brands) {

            return res.json({
                status: false,
                message: 'Get brand fail !!',

            });
        } else {
            res.json({
                status: true,
                message: 'Get ok!!',
                data: {
                    brands
                }
                ,
            });
        }
    } catch (error) {
        console.log(error);
        return res.json({
            status: false,
            message: error.message,

        });
    }

}

module.exports.updateBrand = async (req, res, next) => {
    try {
        const { id, name } = req.params;
        const result = await Brand.update(id, name);
        if (!result) {
            return res.status(400).json({
                status: false,
                message: 'Update brand fail !!',

            });
        } else {
            return res.json({
                status: true,
                message: 'Update brand success!!',
                data: {
                    brand_id: result.insertId
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


module.exports.showListBrand = async (req, res, next) => {
    try {
        const brands = await Brand.getAll()
        res.render('list_product_brands', { brands })
    } catch (error) {
        console.log(error.message);
        res.render('list_product_brands')
    }
}