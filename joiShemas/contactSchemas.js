const Joi = require('joi');

const postContactSchema = Joi.object({
    name: Joi.string().required(),
    number: Joi.string().required(),
});

module.exports = { postContactSchema };