import slugify from "slugify";
import { Category } from "../../../database/models/category.js";
import { SubCategory } from "../../../database/models/subCategory.js";
import { AppError } from "../../utils/AppError.js";
import ApiFeature from "../../utils/apiFeatures.js";
const addSubcategory = async (req, res, next) => {
    try {
        const { name } = req.body;
        const slug = slugify(name);
        const subcategory = new SubCategory({ ...req.body, slug });
        await subcategory.save();
        res.status(201).json({
            "Status": "Success",
            "Message": "SubCategory added",
            "data": subcategory
        });
    } catch (err) {
        next(new AppError(`Error : ${err.message}`, 500))
    }
}
const getAllSubCategories = async (req, res, next) => {
    try {
        let apifeature = new ApiFeature(SubCategory.find(), req.query)
            .pagination(2).fields().sort().search().filter()
        const AllSubcategories = await apifeature.mongooseQuery;
        res.status(200).json({
            "Status": "Success",
            "pageNumber": apifeature.pageNumber,
            "Message": "All Categories retrieved",
            "data": AllSubcategories
        });
    } catch (err) {
        next(new AppError(`Error : ${err.message}`, 500));
    }
}
const getOneSubCategory = async (req, res) => {
    try {
        const oneSubCategory = await SubCategory.findById(req.params.id);
        if (oneSubCategory == null) {
            next(new AppError('SubCategory Not Found', 404))
        }
        res.status(201).json({
            "Status": "Success",
            "Message": "One SubCategory retrived",
            "data": oneSubCategory
        });
    } catch (err) {
        next(new AppError(`Error : ${err.message}`, 500));
    }
}
const getCategorySubcategories = async (req, res, next) => {
    try {
        const oneCategory = await Category.findById(req.params.id);
        if (!oneCategory) {
            return next(new AppError('Category Not Found', 404));
        }
        const subCategories = await SubCategory.find({ category: req.params.id });

        res.status(200).json({
            status: "Success",
            message: "Subcategories retrieved",
            data: subCategories
        });
    } catch (err) {
        next(new AppError(`Error: ${err.message}`, 500));
    }
};
const editSubCategory = async (req, res, next) => {
    try {
        const oneSubCategory = await SubCategory.findById(req.params.id);
        if (oneSubCategory == null) {
            next(new AppError('SubCategory Not Found', 404))
        }
        const { name } = req.body;
        req.body.slug = slugify(name);
        let subcategory = await SubCategory.
            findByIdAndUpdate(req.params.id, req.body, { new: true })
        res.status(201).json({
            "Status": "Success",
            "Message": "SubCategory Updated",
            "data": subcategory
        });
    } catch (err) {
        next(new AppError(`Error: ${err.message}`, 500));
    }
}
const deleteSubCategory = async (req, res, next) => {
    try {
        const oneSubCategory = await SubCategory.findById(req.params.id);
        if (oneSubCategory == null) {
            next(new AppError('SubCategory Not Found', 404))
        }
        await SubCategory.findByIdAndDelete(req.params.id);
        res.status(201).json({
            "Status": "Success",
            "Message": "SubCategory Deleted",
        });
    } catch (err) {
        next(new AppError(`Error: ${err.message}`, 500));
    }
}
export default {
    addSubcategory,
    getAllSubCategories,
    getCategorySubcategories,
    getOneSubCategory,
    editSubCategory,
    deleteSubCategory
};