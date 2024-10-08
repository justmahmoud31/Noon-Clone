import categoryrouter from './Category/category.routes.js';
import subCategoryrouter from './SubCategory/subCategory.routes.js';
import brandRouter from './Brand/brand.routes.js';
import productRouter from './Product/product.routes.js';
import userRouter from './users/users.routes.js';
import authRouter from './auth/auth.routes.js';
import reviewRouter from './Review/review.routes.js';
import wishlistRouter from './wishlist/wishlist.routes.js';
import addressRouter from './Addresses/addresses.routes.js';
import couponRouter from './Coupon/coupon.routes.js';
import cartRouter from './Cart/cart.routes.js';
import orderRouter from './Order/order.routes.js';
export const bootstrap = (app) => {
    app.use('/api/categories', categoryrouter);
    app.use('/api/brands', brandRouter);
    app.use('/api/subcategories', subCategoryrouter);
    app.use('/api/products', productRouter);
    app.use('/api/users',userRouter);
    app.use('/api/auth',authRouter);
    app.use('/api/reviews',reviewRouter);
    app.use('/api/wishlist',wishlistRouter);
    app.use('/api/addresses',addressRouter);
    app.use('/api/coupon',couponRouter);
    app.use('/api/cart',cartRouter);
    app.use('/api/order',orderRouter);
};
