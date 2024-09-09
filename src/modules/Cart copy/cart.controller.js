import { catchError } from '../../middlewares/catchError.js';
import { Cart } from '../../../database/models/cart.js';
import { Product } from '../../../database/models/Products.js';
import { AppError } from '../../utils/AppError.js';
import { Copoun } from '../../../database/models/copouns.js';

const calculateTotalPrice = (cartItems) => {
    let total = cartItems.reduce((total, item) => total + item.quantity * item.price, 0);
    return total;
};

const applyDiscount = (totalPrice, discount) => {
    if (discount) {
        let discountPrice = (discount / 100) * totalPrice;
        return totalPrice - discountPrice;
    }
    return totalPrice;
};

const addToCart = catchError(async (req, res, next) => {
    const quantity = req.body.quantity || 1;
    let cartExists = await Cart.findOne({ user: req.user._id });
    let product = await Product.findById(req.body.product);
    if (!product) return next(new AppError("Product Not Found", 404));
    if (product.stock < quantity) {
        return next(new AppError("Insufficient stock for this quantity", 400));
    }
    req.body.price = product.price;
    if (!cartExists) {
        let cart = new Cart({
            user: req.user._id,
            cartItems: [{
                product: req.body.product,
                quantity: quantity,
                price: product.price
            }]
        });
        cart.totalCartPrice = calculateTotalPrice(cart.cartItems);
        cart.totalCartPriceAfterDiscount = applyDiscount(cart.totalCartPrice, cart.discount);
        await cart.save();
        res.status(200).json({ "Message": "Success", cart });
    } else {
        let item = cartExists.cartItems.find(item => item.product.equals(req.body.product));
        if (item) {
            if (item.quantity + quantity > product.stock) {
                return next(new AppError("You cannot add more than available stock", 400));
            }
            item.quantity += quantity;
            item.price = product.price;
        } else {
            cartExists.cartItems.push({
                product: req.body.product,
                quantity: quantity,
                price: product.price
            });
        }
        cartExists.totalCartPrice = calculateTotalPrice(cartExists.cartItems);
        cartExists.totalCartPriceAfterDiscount = applyDiscount(cartExists.totalCartPrice, cartExists.discount);
        await cartExists.save();
        res.status(200).json({ "Message": "Success", cart: cartExists });
    }
});

const updateCart = catchError(async (req, res, next) => {
    let cart = await Cart.findOne({ user: req.user._id });
    if (!cart) return next(new AppError("Cart Not Found", 404));
    let item = cart.cartItems.find(item => item.product.equals(req.params.id));
    if (!item) return next(new AppError("Product Not Found in Cart", 404));
    item.quantity = req.body.quantity;
    cart.totalCartPrice = calculateTotalPrice(cart.cartItems);
    cart.totalCartPriceAfterDiscount = applyDiscount(cart.totalCartPrice, cart.discount);
    await cart.save();
    res.json({ "Message": "Success", "data": cart });
});

const getAllCart = catchError(async (req, res, next) => {
    let allCart = await Cart.findOne({ user: req.user._id });
    if (!allCart) return next(new AppError("Cart Not Found", 404));
    res.status(200).json({ "Message": "Success", allCart });
});

const deleteAllCart = catchError(async (req, res, next) => {
    await Cart.findOneAndDelete({ user: req.user._id });
    res.status(200).json({ "Message": "Success" });
});

const deleteFromCart = catchError(async (req, res, next) => {
    let cart = await Cart.findOne({ user: req.user._id });
    if (!cart) return next(new AppError("Cart Not Found", 404));
    let itemIndex = cart.cartItems.findIndex(item => item.product.equals(req.params.id));
    if (itemIndex === -1) return next(new AppError("Product Not Found in Cart", 404));
    cart.cartItems.splice(itemIndex, 1);
    cart.totalCartPrice = calculateTotalPrice(cart.cartItems);
    cart.totalCartPriceAfterDiscount = applyDiscount(cart.totalCartPrice, cart.discount);
    await cart.save();
    res.json({ "Message": "Success", "data": cart });
});

const applyCoupon = catchError(async (req, res, next) => {
    let coupon = await Copoun.findOne({ code: req.body.code, expires: { $gte: Date.now() } });
    if (!coupon) {
        return next(new AppError("Coupon Not Valid", 404));
    }
    let cart = await Cart.findOne({ user: req.user._id });
    if (!cart) return next(new AppError("Cart Not Found", 404));
    cart.discount = coupon.discount;
    cart.totalCartPriceAfterDiscount = applyDiscount(cart.totalCartPrice, coupon.discount);
    await cart.save();
    res.json({ "Message": "Success", cart });
});

export default { addToCart, getAllCart, deleteFromCart, updateCart, deleteAllCart, applyCoupon };
