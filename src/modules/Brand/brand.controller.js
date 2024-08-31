import slugify from "slugify";
import { AppError } from "../../utils/AppError.js";
import { Brand } from "../../../database/models/Brand.js";
import * as fs from 'fs';
const addBrand = async (req, res, next) => {
    try {
        const { name } = req.body;
        const slug = slugify(name);
        req.body.logo = req.file.filename;
        const brand = new Brand({ ...req.body, slug });
        await brand.save();
        res.status(201).json({
            status: "Success",
            message: "Brand added",
            data: brand
        });
    } catch (err) {
        next(new AppError(`Error: ${err.message}`, 500));
    }
}
const getAllBrands = async (req, res, next) => {
    try {
        let pageNumber = req.query.page * 1 || 1;
        if (req.query.page < 1) {
            pageNumber = 1
        }
        const limit = 5;
        let skip = (pageNumber - 1) * limit;
        const AllBrands = await Brand.find().skip(skip).limit(limit);
        res.status(200).json({
            "Status": "Success",
            "Message": "All Brands retrieved",
            "data": AllBrands
        });
    } catch (err) {
        next(new AppError(`Error : ${err.message}`, 500));
    }
}
const getOneBrand = async (req, res, next) => {
    try {
        const brand = await Brand.findById(req.params.id);
        if (brand == null) {
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
            return next(new AppError('Brand Not Found', 404));
        }
        let filepath = oneBrand.logo;
        const baseUrl = 'http://localhost:3000/';
        if (filepath.startsWith(baseUrl)) {
            filepath = filepath.replace(baseUrl, '');
        }
        fs.unlink(filepath, (err) => {
            if (err) {
                console.error(`Error removing file: ${err}`);
                return next(new AppError('Error removing old logo file', 500));
            }
        });
        const { name } = req.body;
        if (req.file) req.body.logo = req.file.filename;
        req.body.slug = slugify(name);
        let brand = await Brand.findByIdAndUpdate(req.params.id, req.body, { new: true });

        res.status(201).json({
            status: "Success",
            message: "Brand Updated",
            data: brand
        });
    } catch (err) {
        next(new AppError(`Error: ${err.message}`, 500));
    }
};

const deleteBrand = async (req, res, next) => {
    try {
        const brand = await Brand.findById(req.params.id);
        if (brand == null) {
            next(new AppError('Brand Not Found', 404))
        }
        let filepath = oneBrand.logo;
        const baseUrl = 'http://localhost:3000/';
        if (filepath.startsWith(baseUrl)) {
            filepath = filepath.replace(baseUrl, '');
        }
        fs.unlink(filepath, (err) => {
            if (err) {
                console.error(`Error removing file: ${err}`);
                return next(new AppError('Error removing old logo file', 500));
            }
        });
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