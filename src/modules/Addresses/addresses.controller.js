import { catchError } from '../../middlewares/catchError.js';
import { User } from '../../../database/models/user.js';
import { AppError } from '../../utils/AppError.js';
const addAddresses = catchError(async (req, res, next) => {
    let address = await User.findByIdAndUpdate(
        req.user._id,
        { $push: { addresses: req.body } },
        { new: true }
    );
    if (!address) {
        return next(new AppError("Address Not Found", 400));
    }
    res.json({ "Message": "Success", "data": address.addresses });
});

const removeAddress = catchError(async (req, res, next) => {
    let address = await User.findByIdAndUpdate(
        req.user._id,  
        { $pull: { addresses: { _id: req.params.id } } },  
        { new: true }  
    );
    if (!address) {
        return next(new AppError("Address Not Found", 400));
    }
    res.json({ "Status": "Success", "Message": "Address Removed" });
});

const getAllAddresses = catchError(async (req, res, next) => {
    let address = await User.findById(req.user._id)
    if (!address) {
        return next(new AppError("User Not Found", 400));
    }
    res.json({ "Message": "Success", "data": address.addresses }); 
});

export default { addAddresses, getAllAddresses, removeAddress };