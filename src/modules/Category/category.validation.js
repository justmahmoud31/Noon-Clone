import Joi from "joi";
const categorySchema = Joi.object({
    name: Joi.string().min(2).required(),
    image: Joi.object()
})
export default categorySchema;