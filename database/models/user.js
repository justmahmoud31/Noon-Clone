import mongoose, { Types } from 'mongoose';
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
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        enum:["user","admin"],
        default:"user"
    },
    isBlocked:{
        type:Boolean,
        default:false
    },
    image:String,
    createdBy:{
        type:Types.ObjectId,
        ref:"User"
    }
}, { timestamps: true, versionKey: false });
export const User = mongoose.model('User', schema);