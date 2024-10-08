import Joi from "joi";

const brandSchema = Joi.object({
    name: Joi.string().min(2).required(),
    logo: Joi.object()
});
export default brandSchema;