import { Copoun } from "../../../database/models/copouns.js";
import { AppError } from "../../utils/AppError.js";
import ApiFeature from "api-features";
const addCoupon = async (req, res, next) => {
    try {
        const { code, discount, expires } = req.body;
        const coupon = new Copoun({ code, discount, expires });
        await coupon.save();
        res.status(201).json({
            status: "Success",
            message: "Coupon added",
            data: coupon
        });
    } catch (err) {
        next(new AppError(`Error: ${err.message}`, 500));
    }
};
const getAllCoupons = async (req, res, next) => {
    try {
        let fields = ['code'];
        let apifeature = new ApiFeature(Copoun.find(), req.query,'no-sql')
            .pagination(2) 
            .fields()
            .sort()
            .search(fields)
            .filter();
        const allCoupons = await apifeature.apply();
        res.status(200).json({
            status: "Success",
            pageNumber: apifeature.pageNumber,
            message: "All Coupons retrieved",
            data: allCoupons
        });
    } catch (err) {
        next(new AppError(`Error: ${err.message}`, 500));
    }
};
const getOneCoupon = async (req, res, next) => {
    try {
        const coupon = await Copoun.findById(req.params.id);
        if (!coupon) {
            return next(new AppError('Coupon Not Found', 404));
        }
        res.status(200).json({
            status: "Success",
            message: "One Coupon retrieved",
            data: coupon
        });
    } catch (err) {
        next(new AppError(`Error: ${err.message}`, 500));
    }
};
const editCoupon = async (req, res, next) => {
    try {
        const coupon = await Copoun.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!coupon) {
            return next(new AppError('Coupon Not Found', 404));
        }
        res.status(200).json({
            status: "Success",
            message: "Coupon updated",
            data: coupon
        });
    } catch (err) {
        next(new AppError(`Error: ${err.message}`, 500));
    }
};
const deleteCoupon = async (req, res, next) => {
    try {
        const coupon = await Copoun.findByIdAndDelete(req.params.id);
        if (!coupon) {
            return next(new AppError('Coupon Not Found', 404));
        }
        res.status(200).json({
            status: "Success",
            message: "Coupon deleted"
        });
    } catch (err) {
        next(new AppError(`Error: ${err.message}`, 500));
    }
};

export default {
    addCoupon,
    getAllCoupons,
    getOneCoupon,
    editCoupon,
    deleteCoupon
};
