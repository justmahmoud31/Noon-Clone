import categoryrouter from './Category/category.routes.js';
import subCategoryrouter from './SubCategory/subCategory.routes.js';
import brandRouter from './Brand/brand.routes.js';
import productRouter from './Product/product.routes.js';
import userRouter from './users/users.routes.js';
import authRouter from './auth/auth.routes.js';
import reviewRouter from './Review/review.routes.js';
export const bootstrap = (app) => {
    app.use('/api/categories', categoryrouter);
    app.use('/api/brands', brandRouter);
    app.use('/api/subcategories', subCategoryrouter);
    app.use('/api/products', productRouter);
    app.use('/api/users',userRouter);
    app.use('/api/auth',authRouter);
    app.use('/api/reviews',reviewRouter);
};
