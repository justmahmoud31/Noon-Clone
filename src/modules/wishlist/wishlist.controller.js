
import { catchError } from './../../middlewares/catchError.js';
import { User } from './../../../database/models/user.js';
import { AppError } from '../../utils/AppError.js';
const addWishlist = catchError(async (req, res, next) => {
    let wishlist = await User.findByIdAndUpdate(req.user._id,
        { $addToSet: { wishlist: req.body.product } }
        , req.body, { new: true })
    wishlist || next(new AppError("brand Not Found", 400))
    !wishlist || res.json({ "Message": "Sucess", "data": wishlist });
})
const removeWishlist = catchError(async (req, res, next) => {
    let wishlist = await User.findByIdAndUpdate(
        req.user._id,  
        { $pull: { wishlist: req.params.id } }, 
        { new: true }  
    );
    if (!wishlist) {
        return next(new AppError("Brand Not Found", 400));
    }
    res.json({ "Status": "Success", "Message": "Wish list Removed" });
});

const getAllWishlist = catchError(async (req,res,next)=>{
    let wishlist = await User.findById(req.user._id).populate('wishlist')
    wishlist || next(new AppError("brand Not Found", 400))
    !wishlist || res.json({ "Message": "Sucess", "data": wishlist.wishlist });
})
export default { addWishlist,removeWishlist,getAllWishlist };