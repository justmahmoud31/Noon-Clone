import Joi from 'joi';

const couponSchema = Joi.object({
    code: Joi.string().required().messages({
        'string.base': 'Coupon code must be a string',
        'any.required': 'Coupon code is required'
    }),
    discount: Joi.number().required().messages({
        'number.base': 'Discount must be a number',
        'any.required': 'Discount is required'
    }),
    expires: Joi.date().optional().messages({
        'date.base': 'Expiration must be a valid date'
    })
});

export default couponSchema;
