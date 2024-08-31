import Joi from "joi";
import { AppError } from "../utils/AppError.js"; 
export const generalFields= {
    name:Joi.string(),
    objectId:Joi.string().hex().length(24).required()
}
export const isValid = (schema)=>{
    return (req,res,next)=>{
        let data = {...req.body,...req.params,...req.query}
        const{error}= schema.validate(data,{abortEarly:false})
        if(error){
            const arrMsg=
                error.details.map( err => err.message);

            return next(new AppError(arrMsg,400))
        }
        next()
    }

}