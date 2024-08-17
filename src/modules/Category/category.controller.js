import slugify from 'slugify';
import { Category } from '../../../database/models/category.js';

const addCategory = async (req, res) => {
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
        res.status(500).json({
            "Status": "Error",
            "Message": err.message
        });
    }
};
const getAllCategories = async (req, res) => {
    try {
        const allCategories = await Category.find();
        res.status(200).json({
            "Status": "Success",
            "Message": "All Categories retrieved",
            "data": allCategories
        });
    } catch (err) {
        res.status(500).json({
            "Status": "Error",
            "Message": err.message
        });
    }
};
const getOneCategory = async (req, res) => {
    try {
        const oneCategory = await Category.findById(req.params.id);
        if (!oneCategory) {
            return res.status(404).json({
                "Status": "Error",
                "Message": "Category not found"
            });
        }
        res.status(200).json({
            "Status": "Success",
            "Message": "Category retrieved",
            "data": oneCategory
        });
    } catch (err) {
        res.status(500).json({
            "Status": "Error",
            "Message": err.message
        });
    }
};
const editCategory = async (req, res) => {
    try {
        const oneCategory = await Category.findById(req.params.id);
        if (oneCategory==null) {
            return res.status(404).json({
                "Status": "Error",
                "Message": "Category not found"
            });
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
        res.status(500).json({
            "Status": "Error",
            "Message": err.message
        });
    }
}
const deleteCategory = async (req,res)=>{
    try{
        const oneCategory = await Category.findById(req.params.id);
        if (!oneCategory) {
            return res.status(404).json({
                "Status": "Error",
                "Message": "Category not found"
            });
        }
        await Category.findByIdAndDelete(req.params.id);
        res.status(200).json({
            "Status": "Success",
            "Message": "Category Deleted",
        });
    }catch(err){
        res.status(500).json({
            "Status": "Error",
            "Message": err.message
        });
    }
}
export default { addCategory, getAllCategories, getOneCategory,editCategory,deleteCategory };
