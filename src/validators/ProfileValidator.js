const { celebrate, Joi, Segments } = require('celebrate');

module.exports = {
  create: celebrate({
    [Segments.HEADERS]: Joi.object({
      authorization: Joi.string().required().alphanum().length(8)
    }).unknown()
  })
}