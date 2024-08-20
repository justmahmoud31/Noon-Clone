import slugify from "slugify";
import { AppError } from "../../utils/AppError.js";
import { Brand } from "../../../database/models/Brand.js";
const addBrand = async (req, res, next) => {
    try {
        const { name } = req.body;
        const slug = slugify(name);
        const brand = new Brand({ ...req.body, slug });
        await brand.save();
        res.status(201).json({
            "Status": "Success",
            "Message": "Brand added",
            "data": brand
        });
    } catch (err) {
        next(new AppError(`Error : ${err.message}`, 500))
    }
}
const getAllBrands = async (req, res, next) => {
    try {
        const AllBrands = await Brand.find();
        res.status(200).json({
            "Status": "Success",
            "Message": "All Brands retrieved",
            "data": AllBrands
        });
    } catch (err) {
        next(new AppError(`Error : ${err.message}`, 500));
    }
}
const getOneBrand = async (req, res) => {
    try {
        const brand = await Brand.findById(req.params.id);
        if (brand  == null) {
            next(new AppError('Brand Not Found', 404))
        }
        res.status(201).json({
            "Status": "Success",
            "Message": "One Brand retrived",
            "data": brand
        });
    } catch (err) {
        next(new AppError(`Error : ${err.message}`, 500));
    }
}
const editBrand = async (req, res, next) => {
    try {
        const oneBrand = await Brand.findById(req.params.id);
        if (oneBrand == null) {
            next(new AppError('Brand Not Found', 404))
        }
        const { name } = req.body;
        req.body.slug = slugify(name);
        let brand = await Brand.
        findByIdAndUpdate(req.params.id, req.body, { new: true })
        res.status(201).json({
            "Status": "Success",
            "Message": "Brand Updated",
            "data": brand
        });
    } catch (err) {
        next(new AppError(`Error: ${err.message}`, 500));
    }
}
const deleteBrand = async (req, res, next) => {
    try {
        const brand = await Brand.findById(req.params.id);
        if (brand == null) {
            next(new AppError('Brand Not Found', 404))
        }
        await Brand.findByIdAndDelete(req.params.id);
        res.status(201).json({
            "Status": "Success",
            "Message": "Brand Deleted",
        });
    } catch (err) {
        next(new AppError(`Error: ${err.message}`, 500));
    }
}
export default {
addBrand,
getAllBrands,
getOneBrand,
editBrand,
deleteBrand
};