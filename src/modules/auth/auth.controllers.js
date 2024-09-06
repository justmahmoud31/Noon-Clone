import jwt from "jsonwebtoken";
import { AppError } from './../../utils/AppError.js';
import { catchError } from './../../middlewares/catchError.js';
import { User } from './../../../database/models/user.js';
import bcrypt from "bcrypt";

const signup = catchError(async (req, res) => {
    let user = new User(req.body);
    await user.save();
    let token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWTSECRET)
    res.json({ "Message": "User Signed Up", "token": token, "data": user })
})
const login = catchError(async (req, res, next) => {
    const user = await User.findOne({ email: req.body.email });
    if (!user || !bcrypt.compareSync(req.body.password, user.password))
        return next(new AppError('email or password  not valid', 401))
    let token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWTSECRET)
    res.json({ "Message": "User Signed Up", "token": token, "data": user })
});

const changeuserPassword = catchError(async (req, res, next) => {
    const user = await User.findById(req.params.id);
    if (!user || !bcrypt.compareSync(req.body.oldPassword, user.password)) {
        return next(new AppError('Email or password not valid', 401));
    }
    const newPassword = bcrypt.hashSync(req.body.newPassword, 8);
    await User.findByIdAndUpdate(
        user._id,
        {
            password: newPassword,
            passwordChangedAt: Date.now()
        },
        { new: true }
    );
    const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWTSECRET);
    const updatedUser = await User.findById(user._id);
    res.json({ "Message": "Password updated successfully", "token": token, "data": updatedUser });
});

const protectedRoutes = catchError(async (req, res, next) => {
    let { token } = req.headers;
    let userData = null;
    if (!token) {
        return next(new AppError("Token Not Found", 401));
    }
    jwt.verify(token, process.env.JWTSECRET, (err, payload) => {
        if (err) return next(new AppError(err, 401))
        userData = payload;
    })
    const user = await User.findById(userData.userId);
    if (!user) {
        return next(new AppError("User Not Found", 404));
    }
    if (user.passwordChangedAt) {
        let time = parseInt(user.passwordChangedAt?.getTime() / 1000)
        if (time > userData.iat)
            return next(new AppError("Not Valid Token , Please login again", 404));
    }
    req.user = user
    next()
})

const accessKey = (...roles) => {
    return catchError(async (req, res, next) => {
        if(roles.includes(req.user.role)){
            return next();
        }
        return next(new AppError("Not Valid", 404));

    })
}
export {
    signup,
    login,
    changeuserPassword,
    protectedRoutes,
    accessKey
}