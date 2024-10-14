import Joi from 'joi'

export const photoRequestSchema = Joi.object({
  userId: Joi.string().required().messages({
    'string.base': 'userId must be a string',
    'any.required': 'userId is required'
  }),
  userName: Joi.string().required().messages({
    'string.base': 'userName must be a string',
    'any.required': 'userName is required'
  }),
  userApiKey: Joi.string().required().messages({
    'string.base': 'userApiKey must be a string',
    'any.required': 'userApiKey is required'
  })
})
