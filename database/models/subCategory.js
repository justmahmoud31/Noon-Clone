import mongoose, { Types } from 'mongoose';
const schema = new mongoose.Schema({
    name: {
        type: String,
        unique: [true, 'name is required and must be unique'],
        trim: true,
        required: true,
        minLength: [2, 'too short category name']
    },
    slug: {
        type: String,
        lowercase: true,
        required: true
    },
     category:{
        type:Types.ObjectId,
        ref:"Category"
     }
}, { timestamps: true, versionKey: false });
export const SubCategory = mongoose.model('SubCategory', schema);