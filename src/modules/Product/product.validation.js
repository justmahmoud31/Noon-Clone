import Joi from "joi";

const productSchema = Joi.object({
  title: Joi.string()
    .trim()
    .required()
    .min(2)
    .messages({
      'string.min': 'Title must be at least 2 characters long',
      'any.required': 'Title is required',
    }),
  description: Joi.string()
    .required()
    .min(30)
    .max(1000)
    .messages({
      'string.min': 'Description must be at least 30 characters long',
      'string.max': 'Description cannot exceed 1000 characters',
      'any.required': 'Description is required',
    }),
  imageCover: Joi.string().optional().allow(null),
  images: Joi.array().items(Joi.string().allow(null)).optional().allow(null),
  price: Joi.number()
    .required()
    .min(0)
    .messages({
      'number.min': 'Price cannot be negative',
      'any.required': 'Price is required',
    }),
  priceAfterDiscount: Joi.number()
    .optional()
    .min(0)
    .messages({
      'number.min': 'Discounted price cannot be negative',
    }),
  sold: Joi.number().optional().allow(null),
  stock: Joi.number()
    .min(0)
    .optional()
    .allow(null)
    .messages({
      'number.min': 'Stock cannot be negative',
    }),
  category: Joi.string().optional(),
  subcategory: Joi.string().optional(),
  brand: Joi.string().optional(),
  rateAvg: Joi.number()
    .min(0)
    .max(5)
    .optional()
    .messages({
      'number.min': 'Average rating cannot be negative',
      'number.max': 'Average rating cannot exceed 5',
    }),
  rateCount: Joi.number().optional(),
  createdBy: Joi.string().optional(),
});

export default productSchema;
