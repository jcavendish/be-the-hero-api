const { celebrate, Joi, Segments } = require('celebrate');

module.exports = {
  create: celebrate({
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string().required().regex(/[A-Za-z]/),
      email: Joi.string().required().email(),
      whatsapp: Joi.string().required().min(10).max(14),
      city: Joi.string().required(),
      uf: Joi.string().required()
    })
  })
}