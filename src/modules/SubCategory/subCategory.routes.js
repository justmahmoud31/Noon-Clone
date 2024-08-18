import { Router } from "express";
import subCategoryControllers from "./subCategory.controllers.js";
const subCategoryrouter  = Router();
subCategoryrouter.post('/addsubcategory',subCategoryControllers.addSubcategory);
subCategoryrouter.get('/',subCategoryControllers.getAllSubCategories);
subCategoryrouter.get('/categorysubcategory/:id',subCategoryControllers.getCategorySubcategories);
subCategoryrouter.get('/getonesubcategory/:id',subCategoryControllers.getOneSubCategory);
subCategoryrouter.put('/editsubcategory/:id',subCategoryControllers.editSubCategory);
subCategoryrouter.delete('/deletesubcategory/:id',subCategoryControllers.deleteSubCategory);
export default subCategoryrouter ;