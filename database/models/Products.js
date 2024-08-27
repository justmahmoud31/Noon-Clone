import mongoose, { Types } from 'mongoose';
import { configDotenv } from 'dotenv';
configDotenv();
const schema = new mongoose.Schema({
    title: {
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
    description: {
        type: String,
        minLength: 30,
        maxLength: 1000,
        required: true
    },
    imageCover: String,
    images: [String],
    price: {
        type: Number,
        required: true,
        min: 0
    },
    priceAfterDiscount: {
        type: Number,
        required: true,
        min: 0
    },
    sold: Number,
    stock: {
        type: Number,
        min: 0
    },
    category: {
        type: Types.ObjectId,
        ref: 'Category'
    },
    subcategory: {
        type: Types.ObjectId,
        ref: 'SubCategory'
    },
    brand: {
        type: Types.ObjectId,
        ref: 'Brand'
    },
    rateAvg: {
        type: Number,
        min: 0,
        max: 5
    },
    rateCount: Number,
    createdBy: {
        type: Types.ObjectId,
        ref: "User"
    }
}, { timestamps: true, versionKey: false });
schema.post('init', function (doc) {
    doc.imageCover = process.env.BASEURL + '/uploads/products/' + doc.imageCover;
    if (Array.isArray(doc.images)) {
        doc.images = doc.images.map(img => img ? process.env.BASEURL + '/uploads/products/' + img : null);
    } else {
        doc.images = [];
    }
});

export const Product = mongoose.model('Product', schema);