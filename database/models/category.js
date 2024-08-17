import mongoose from 'mongoose';
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
        unique: [true, 'name is required and must be unique'],
        lowercase: true,
        required: true
    },
    image: String
}, { timestamps: true, versionKey: false });
export const Category = mongoose.model('Category', schema);