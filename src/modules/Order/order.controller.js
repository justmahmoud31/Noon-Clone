import { catchError } from '../../middlewares/catchError.js';
import { Cart } from '../../../database/models/cart.js';
import { AppError } from '../../utils/AppError.js';
import { Order } from '../../../database/models/order.js';
import { Product } from '../../../database/models/Products.js';
import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_KEY);

const createCashOrder = catchError(async (req, res, next) => {
   let cart = await Cart.findById(req.params.id);
   if (!cart) {
      return next(new AppError("Cart Not Found", 404));
   }
   let totalOrderPrice = cart.totalCartPriceAfterDiscount || cart.totalCartPrice
   let order = new Order({
      user: req.user._id,
      orderItems: cart.cartItems,
      shippingAddress: req.body.shippingAddress,
      totalOrderPrice
   })

   await order.save();
   let options = cart.cartItems.map((prod) => {
      return ({
         updateOne: {
            "filter": { _id: prod.product },
            "update": { $inc: { sold: prod.quantity, stock: -prod.quantity } }
         }
      })
   })
   await Product.bulkWrite(options)
   await Cart.findByIdAndDelete(cart._id);
   res.status(201).json({ "Message": "Success", order })
});
const getUserOrder = catchError(async (req, res, next) => {
   const userOrders = await Order.findOne({ user: req.user._id });
   if (!userOrders) {
      return next(new AppError("User Orders Not Found", 404))
   }
   res.status(201).json({ "Message": "Sucess", userOrders });
})
const getAllOrders = catchError(async (req, res, next) => {
   const usersOrders = await Order.find();
   if (!usersOrders) {
      return next(new AppError("User Orders Not Found", 404))
   }
   res.status(201).json({ "Message": "Sucess", usersOrders });
});
const createCheckOut = catchError(async (req, res, next) => {
   let cart = await Cart.findById(req.params.id);
   if (!cart) {
      return next(new AppError("Cart Not Found", 404));
   }
   let totalPrice = cart.totalCartPriceAfterDiscount || cart.totalCartPrice;
   let session = await stripe.checkout.sessions.create({
      line_items: [
         {
            price_data: {
               currency: 'egp',
               unit_amount: totalPrice * 100,
               product_data: {
                  name: req.user.name
               }
            },
            quantity: 1,
         }
      ],
      mode: 'payment',
      success_url: "https://github.com/justmahmoud31?tab=repositories",
      cancel_url: 'https://www.npmjs.com/package/api-features',
      customer_email: req.user.email,
      client_reference_id: req.params.id,
      metadata: req.body.shippingAddress,
   })
   res.status(200).json({ "Message": "Success", session })
})
export default { createCashOrder, getUserOrder, getAllOrders,createCheckOut };
