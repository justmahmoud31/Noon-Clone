import mongoose, { Types } from 'mongoose';
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
        lowercase: true,
        required: true
    },
    createdBy:{
        type:Types.ObjectId,
        ref:"User"
    },
    logo: String
}, { timestamps: true, versionKey: false });
schema.post('init', function (doc) {
    doc.logo = process.env.BASEURL + '/uploads/brands/' + doc.logo;
})
export const Brand = mongoose.model('Brand', schema);