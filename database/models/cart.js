import mongoose from "mongoose";

const schema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    cartItems: [
        {
            product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
            quantity: { type: Number, default: 1 },
            price: Number
        }
    ],
    totalCartPrice: Number,
    discount: Number,
    totalCartPriceAfterDiscount: Number
}, { timestamps: true, versionKey: false });

export const Cart = mongoose.model('Cart', schema);  
