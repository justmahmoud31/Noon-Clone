import joi from 'joi'
import { AppError } from "../utils/appError.js"; 
export const generalFields= {
    name:joi.string(),
    colors:joi.custom(parseArray),
    size:joi.custom(parseArray),
    objectId:joi.string().hex().length(24).required()
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