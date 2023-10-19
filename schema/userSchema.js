const Joi = require('joi')

exports.userCreateSchema = Joi.object({
  id: Joi.string().required(),
  email: Joi.string().email().required(),
  name: Joi.string().required(),
  firstname: Joi.string().required(),
  password: Joi.string().required(),
  address: Joi.object({
      line: Joi.string().required(),
      zipcode: Joi.required(),
      city: Joi.string().required(),
      country: Joi.string().required(),
  }).required(),
  role: Joi.string().valid('user', 'admin').required(),
  isActive: Joi.boolean().required(),
})

exports.userUpdateSchema = Joi.object({
  email: Joi.string().email().required(),
  name: Joi.string().required(),
  firstname: Joi.string().required(),
  password: Joi.string().required(),
  address: Joi.object({
      line: Joi.string().required(),
      zipcode: Joi.required(),
      city: Joi.string().required(),
      country: Joi.string().required(),
  }).required(),
  role: Joi.string().valid('user', 'admin').required(),
  isActive: Joi.boolean().required(),
})