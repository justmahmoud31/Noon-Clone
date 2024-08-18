import categoryrouter from './Category/category.routes.js';
import subCategoryrouter from './SubCategory/subCategory.routes.js';
import brandRouter from './Brand/brand.routes.js';
export const bootstrap = (app) => {
    app.use('/api/categories', categoryrouter);
    app.use('/api/brands', brandRouter);
    app.use('/api/subcategories', subCategoryrouter);
};
