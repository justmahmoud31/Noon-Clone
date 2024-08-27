import slugify from "slugify";
import { Product} from "../../../database/models/Products.js";
import { AppError } from '../../utils/AppError.js';
import fs from 'fs';
import path from 'path';
const addProduct = async (req, res, next) => {
    try {
        const { title } = req.body;
        const slug = slugify(title);
        if (!req.files || !req.files.imageCover || !req.files.images) {
            return next(new AppError('Image files are missing', 400));
        }
        const imageCover = req.files.imageCover[0].filename;
        const images = req.files.images.map(img => img.filename);
        req.body.imageCover = imageCover;
        req.body.images = images;
        const product = new Product({ ...req.body, slug });
        await product.save();
        res.status(201).json({
            Status: "Success",
            Message: "Product added",
            data: product
        });
    } catch (err) {
        next(new AppError(`Error: ${err.message}`, 500));
    }
};

const getAllProducts = async (req, res, next) => {
    try {
        const allProducts = await Product.find();
        res.status(200).json({
            "Status": "Success",
            "Message": "All Products",
            "data": allProducts
        });
    } catch (err) {
        next(new AppError(`Error : ${err.message}`, 500))
    }
}
const getOneProduct = async (req, res, next) => {
    try {
        const oneProduct = await Product.findById(req.params.id);
        if (!oneProduct) {
            next(new AppError(`Product Not Found`, 500));
        }
        res.status(200).json({
            "Status": "Success",
            "Message": "Product retrieved",
            "data": oneProduct
        });
    } catch (err) {
        next(new AppError(`Error : ${err.message}`, 500))
    }
}
const getBrandProduct = async (req, res, next) => {
    try {
        const {id}= req.params;
        const brandProduct = await Product.find({ brand: id}); 
        if (brandProduct.length === 0) {
            return next(new AppError("There are no products for this brand", 404));
        }
        res.status(200).json({
            "Status": "Success",
            "Message": "Products retrieved",
            "data": brandProduct
        });
    } catch (err) {
        next(new AppError(`Error: ${err.message}`, 500));
    }
}
const getCategoryProducts = async (req, res, next) => {
    try {
        const {id}= req.params;
        const categoryproducts = await Product.find({ category: id});
        if (!categoryproducts) {
            return next(new AppError("There are no products for this Category", 404));
        }
        res.status(200).json({
            "Status": "Success",
            "Message": "Products retrieved",
            "data": categoryproducts
        });
    } catch (err) {
        next(new AppError(`Error : ${err.message}`, 500))
    }
}
const editProduct = async (req, res, next) => {
    try {
        const oneProduct = await Product.findById(req.params.id);
        if (!oneProduct) {
            return next(new AppError('There is no such product', 404));
        }
        const { title } = req.body;
        const slug = slugify(title);
        if (req.files.imageCover) {
            if (oneProduct.imageCover) {
                const oldImageCoverFilename = oneProduct.imageCover.split('/').pop();
                const oldImageCoverPath = path.join('uploads/products', oldImageCoverFilename);
                if (fs.existsSync(oldImageCoverPath)) {
                    fs.unlink(oldImageCoverPath, (err) => {
                        if (err) {
                            console.error(`Error deleting old image cover: ${err.message}`);
                        }
                    });
                }
            }
            req.body.imageCover = req.files.imageCover[0].filename;
        }
        if (req.files.images) {
            if (oneProduct.images && oneProduct.images.length > 0) {
                oneProduct.images.forEach(image => {
                    if (image) {
                        const oldImageFilename = image.split('/').pop();
                        const oldImagePath = path.join('uploads/products', oldImageFilename);
                        if (fs.existsSync(oldImagePath)) {
                            fs.unlink(oldImagePath, (err) => {
                                if (err) {
                                    console.error(`Error deleting old image: ${err.message}`);
                                }
                            });
                        }
                    }
                });
            }
            req.body.images = req.files.images.map(img => img.filename);
        }
        const product = await Product.findByIdAndUpdate(req.params.id, { ...req.body, slug }, { new: true });
        await product.save();
        res.status(200).json({
            "Status": "Success",
            "Message": "Product updated",
            "data": product
        });
    } catch (err) {
        next(new AppError(`Error: ${err.message}`, 500));
    }
}
const deleteProduct = async (req, res, next) => {
    try {
        const oneProduct = await Product.findById(req.params.id);
        if (!oneProduct) {
            return next(new AppError('There no such a Product', 404));
        }
            if (oneProduct.imageCover) {
                const oldImageCoverFilename = oneProduct.imageCover.split('/').pop();
                const oldImageCoverPath = path.join('uploads/products', oldImageCoverFilename);
                if (fs.existsSync(oldImageCoverPath)) {
                    fs.unlink(oldImageCoverPath, (err) => {
                        if (err) {
                            console.error(`Error deleting old image cover: ${err.message}`);
                        }
                    });
                }
            }   
            if (oneProduct.images && oneProduct.images.length > 0) {
                oneProduct.images.forEach(image => {
                    if (image) {
                        const oldImageFilename = image.split('/').pop();
                        const oldImagePath = path.join('uploads/products', oldImageFilename);
                        if (fs.existsSync(oldImagePath)) {
                            fs.unlink(oldImagePath, (err) => {
                                if (err) {
                                    console.error(`Error deleting old image: ${err.message}`);
                                }
                            });
                        }
                    }
                });
        }
        await Product.findByIdAndDelete(req.params.id);
        res.status(200).json({
            "Status": "Success",
            "Message": "Product Deleted",
        });
    } catch (err) {
        next(new AppError(`Error : ${err.message}`, 500))
    }
}
export default {
    addProduct,
    getAllProducts,
    getOneProduct,
    getBrandProduct,
    getCategoryProducts,
    editProduct,
    deleteProduct
};