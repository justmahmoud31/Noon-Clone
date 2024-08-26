import mongoose from 'mongoose';
import { configDotenv } from 'dotenv';
configDotenv();
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
schema.post('init', function (doc) {
    doc.image = process.env.BASEURL + '/uploads/categories/' + doc.image;
})
export const Category = mongoose.model('Category', schema);