import { Router } from "express";
import categoryController from "./category.controller.js";
import { singleFile } from "../../File Upload/fileupload.js";
import { isValid } from "../../middlewares/Validation.js";
import categorySchema from "./category.validation.js";
const categoryrouter = Router();
categoryrouter.post('/addcategory',singleFile('image','categories'),isValid(categorySchema),categoryController.addCategory)
categoryrouter.get('/',categoryController.getAllCategories)
categoryrouter.get('/oneCategory/:id',categoryController.getOneCategory)
categoryrouter.put('/updatecategory/:id',singleFile('image','categories'),categoryController.editCategory)
categoryrouter.delete('/deletecategory/:id',categoryController.deleteCategory);
export default categoryrouter;