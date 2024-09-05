import slugify from "slugify";
import { User } from "../../../database/models/user.js";
import { AppError } from '../../utils/AppError.js';
import fs from 'fs';
import path from 'path';
import ApiFeature from "api-features";
const addUser = async (req, res, next) => {
    try {
        const { name, email } = req.body;
        const slug = slugify(name);
        let user = new User({ ...req.body, slug });
        await user.save();
        res.status(201).json({
            Status: "Success",
            Message: "User added",
            data: user
        });
    } catch (err) {
        next(new AppError(`Error: ${err.message}`, 500));
    }
};
const getAllUsers = async (req, res, next) => {
    try {
        let fields = ['name', 'email'];
        let apifeature = new ApiFeature(User.find(), req.query)
            .pagination(2)
            .fields()
            .sort()
            .search(fields)
            .filter();
        let allUsers = await apifeature.mongooseQuery;
        res.status(200).json({
            Status: "Success",
            pageNumber: apifeature.pageNumber,
            Message: "All Users",
            data: allUsers
        });
    } catch (err) {
        next(new AppError(`Error : ${err.message}`, 500));
    }
};
const getOneUser = async (req, res, next) => {
    try {
        const oneUser = await User.findById(req.params.id);
        if (!oneUser) {
            return next(new AppError(`User Not Found`, 404));
        }
        res.status(200).json({
            Status: "Success",
            Message: "User retrieved",
            data: oneUser
        });
    } catch (err) {
        next(new AppError(`Error : ${err.message}`, 500));
    }
};
const editUser = async (req, res, next) => {
    try {
        const oneUser = await User.findById(req.params.id);
        if (!oneUser) {
            return next(new AppError('User not found', 404));
        }
        const updatedData = { ...req.body };
        if (req.body.name) {
            updatedData.slug = slugify(req.body.name);
        }
        if (req.files.image) {
            if (oneUser.image) {
                const oldImageFilename = oneUser.image.split('/').pop();
                const oldImagePath = path.join('uploads/users', oldImageFilename);
                if (fs.existsSync(oldImagePath)) {
                    fs.unlink(oldImagePath, (err) => {
                        if (err) {
                            console.error(`Error deleting old image: ${err.message}`);
                        }
                    });
                }
            }
            updatedData.image = req.files.image[0].filename;
        }
        const user = await User.findByIdAndUpdate(req.params.id, updatedData, { new: true });
        res.status(200).json({
            Status: "Success",
            Message: "User updated",
            data: user
        });
    } catch (err) {
        next(new AppError(`Error: ${err.message}`, 500));
    }
};
const deleteUser = async (req, res, next) => {
    try {
        const oneUser = await User.findById(req.params.id);
        if (!oneUser) {
            return next(new AppError('User not found', 404));
        }
        if (oneUser.image) {
            const oldImageFilename = oneUser.image.split('/').pop();
            const oldImagePath = path.join('uploads/users', oldImageFilename);
            if (fs.existsSync(oldImagePath)) {
                fs.unlink(oldImagePath, (err) => {
                    if (err) {
                        console.error(`Error deleting old image: ${err.message}`);
                    }
                });
            }
        }
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json({
            Status: "Success",
            Message: "User Deleted",
        });
    } catch (err) {
        next(new AppError(`Error : ${err.message}`, 500));
    }
};
export default {
    addUser,
    getAllUsers,
    getOneUser,
    editUser,
    deleteUser
};