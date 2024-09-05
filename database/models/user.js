import mongoose, { Types } from 'mongoose';
import bcrypt from "bcrypt";
const schema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    slug: {
        type: String,
        lowercase: true,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user"
    },
    isBlocked: {
        type: Boolean,
        default: false
    },
    image: String,
    createdBy: {
        type: Types.ObjectId,
        ref: "User"
    }
}, { timestamps: true, versionKey: false });
schema.pre('save', function () {
    this.password = bcrypt.hashSync(this.password, 8)
})
schema.pre('findOneAndUpdate', function () {
    if (this._update.password) bcrypt.hashSync(this._update.password, 8)
})
export const User = mongoose.model('User', schema);