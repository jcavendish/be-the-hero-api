const { celebrate, Joi, Segments } = require('celebrate');

module.exports = {
  create: celebrate({
    [Segments.BODY]: Joi.object().keys({
      title: Joi.string().required().regex(/\w/),
      description: Joi.string().required(),
      value: Joi.number().required().min(1)
    }),
    [Segments.HEADERS]: Joi.object({
      authorization: Joi.string().required().alphanum().length(8)
    }).unknown()
  }),
  delete: celebrate({
    [Segments.HEADERS]: Joi.object({
      authorization: Joi.string().required().alphanum().length(8)
    }).unknown(),
    [Segments.PARAMS]: Joi.object({
      id: Joi.number().required().min(1)
    })
  })
}