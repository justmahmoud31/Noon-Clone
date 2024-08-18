import slugify from 'slugify';
import { Category } from '../../../database/models/category.js';
import { AppError } from '../../utils/AppError.js';
const addCategory = async (req, res, next) => {
    try {
        const { name } = req.body;
        const slug = slugify(name);
        const category = new Category({ ...req.body, slug });
        await category.save();
        res.status(201).json({
            "Status": "Success",
            "Message": "Category added",
            "data": category
        });
    } catch (err) {
        next(new AppError(`Error : ${err.message}`, 500))
    }
};
const getAllCategories = async (req, res,next) => {
    try {
        const allCategories = await Category.find();
        res.status(200).json({
            "Status": "Success",
            "Message": "All Categories retrieved",
            "data": allCategories
        });
    } catch (err) {
        next(new AppError(`Error : ${err.message}`, 500))
    }
};
const getOneCategory = async (req, res,next) => {
    try {
        const oneCategory = await Category.findById(req.params.id);
        if (!oneCategory) {
            next(new AppError('Category Not Found', 404))
        }
        res.status(200).json({
            "Status": "Success",
            "Message": "Category retrieved",
            "data": oneCategory
        });
    } catch (err) {
        next(new AppError(`Error : ${err.message}`, 500));
    }
};
const editCategory = async (req, res,next) => {
    try {
        const oneCategory = await Category.findById(req.params.id);
        if (oneCategory == null) {
            next(new AppError('Category Not Found', 404))
        }
        const { name } = req.body;
        req.body.slug = slugify(name);
        let category = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(201).json({
            "Status": "Success",
            "Message": "Category added",
            "data": category
        });
    } catch (err) {
        next(new AppError(`Error : ${err.message}`, 500))
    }
}
const deleteCategory = async (req, res,next) => {
    try {
        const oneCategory = await Category.findById(req.params.id);
        if (!oneCategory) {
            next(new AppError('Category Not Found', 404))
        }
        await Category.findByIdAndDelete(req.params.id);
        res.status(200).json({
            "Status": "Success",
            "Message": "Category Deleted",
        });
    } catch (err) {
        next(new AppError(`Error : ${err.message}`, 500))
    }
}
export default { addCategory, getAllCategories, getOneCategory, editCategory, deleteCategory };