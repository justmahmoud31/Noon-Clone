import Joi from "joi";
const userSchema = Joi.object({
    name: Joi.string().min(2).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    role: Joi.string().valid('user', 'admin').default('user'),
    isBlocked: Joi.boolean().default(false),
    image: Joi.object() .optional()
});
export default userSchema;
