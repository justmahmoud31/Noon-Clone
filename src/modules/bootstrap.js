import Categoryrouter from './Category/category.routes.js'
export const bootstrap = (app)=>{
    app.use('/api/categories',Categoryrouter);
}