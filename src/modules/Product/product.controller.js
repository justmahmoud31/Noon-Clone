import slugify from "slugify";
import { Product} from "../../../database/models/Products.js";
import { AppError } from '../../utils/AppError.js';
const addProduct = async (req, res, next) => {
    try {
        const { title } = req.body;
        const slug = slugify(title);
        const product = new Product({ ...req.body, slug });
        await product.save();
        res.status(201).json({
            "Status": "Success",
            "Message": "Product added",
            "data": product
        });
    } catch (err) {
        next(new AppError(`Error : ${err.message}`, 500))
    }
}
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
            return next(new AppError('There no such a Product', 404));
        }
        const { title } = req.body;
        const slug = slugify(title);
        let product= await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
        await product.save();
        res.status(201).json({
            "Status": "Success",
            "Message": "Product Updated",
            "data": product
        });
    } catch (err) {
        next(new AppError(`Error : ${err.message}`, 500))
    }
}
const deleteProduct = async (req, res, next) => {
    try {
        const oneProduct = await Product.findById(req.params.id);
        if (!oneProduct) {
            return next(new AppError('There no such a Product', 404));
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