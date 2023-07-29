const Joi = require('joi');

const sighupShcema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
})


const signupValidate = (req, res,next) => {
    const { error, value } = sighupShcema.validate(req.body);

    if (error) {
        res.status(400).json({message: error.message})
        return
    }

    next();
}

module.exports = signupValidate;