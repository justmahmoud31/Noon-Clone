
import { AppError } from '../../utils/AppError.js';
import ApiFeature from 'api-features';
import { Review } from './../../../database/models/review.js';
const addReview = async (req, res, next) => {
    try {
        req.body.user = req.user._id;
        const oldReview = await Review.findOne({ user: req.user._id, product: req.body.product });
        if(oldReview){
            return next(new AppError("You can not add A review to this product",409));
        }
        const review = new Review(req.body);
        await review.save();
        res.status(201).json({
            "Status": "Success",
            "Message": "Review added",
            "data": review
        });
    } catch (err) {
        next(new AppError(`Error : ${err.message}`, 500))
    }
};
const getAllReviews = async (req, res, next) => {
    try {
        let apifeature = new ApiFeature(Review.find(), req.query)
        .pagination(5).fields().sort().search(['rate']).filter()
        const allReviews = await apifeature.mongooseQuery;
        res.status(200).json({
            "Status": "Success",
            "Message": "All Reviews retrieved",
            "pageNumber" : apifeature.pageNumber,
            "data": allReviews
        });
    } catch (err) {
        next(new AppError(`Error : ${err.message}`, 500))
    }
};
const getOneReview = async (req, res, next) => {
    try {
        const oneReview = await Review.findById(req.params.id);
        if (!oneReview) {
            next(new AppError('Review Not Found', 404))
        }
        res.status(200).json({
            "Status": "Success",
            "Message": "Review retrieved",
            "data": oneReview
        });
    } catch (err) {
        next(new AppError(`Error : ${err.message}`, 500));
    }
};
const editReview = async (req, res, next) => {
    try {
        const oldReview = await Review.findOne({ user: req.user._id, _id: req.params.id });
        if(!oldReview){
            return next(new AppError("You Can Not edit this review",409));
        }
        const oneReview = await Review.findOne({ user: req.user._id, _id: req.params.id });
        if (oneReview == null) {
            next(new AppError('Review Not Found', 404))
        }
            let review = await Review.findByIdAndUpdate(req.params.id, req.body, { new: true });
            res.status(201).json({
                "Status": "Success",
                "Message": "Review Updated",
                "data": review
            });
    } catch (err) {
        next(new AppError(`Error : ${err.message}`, 500))
    }
}
const deleteReview = async (req, res, next) => {
    try {
        const oneReview = await Review.findById(req.params.id);
        if (!oneReview) {
            next(new AppError('Review Not Found', 404))
        }
        await Review.findByIdAndDelete(req.params.id);
        res.status(200).json({
            "Status": "Success",
            "Message": "Review Deleted",
        });
    } catch (err) {
        next(new AppError(`Error : ${err.message}`, 500))
    }
}
export default { addReview,getAllReviews,getOneReview,editReview,deleteReview };