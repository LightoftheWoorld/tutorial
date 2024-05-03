const Joi = require("joi")

const authSchema = Joi.object({
    email: Joi.string().email().lowercase().required(),
    password: Joi.string().min(2).required(),
    confirmPassword: Joi.ref('password'),
    firstname: Joi.string().trim().required(),
    middlename: Joi.string().trim(),
    lastname: Joi.string().trim().required(),
    sex: Joi.string().valid('male', 'female').lowercase().required()
})

const signInSchema = Joi.object({
    email: Joi.string().email().lowercase().required(),
    password: Joi.string().min(2).required()
})

module.exports = {
    authSchema,
    signInSchema
}