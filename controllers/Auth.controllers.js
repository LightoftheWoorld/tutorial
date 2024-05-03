const createError = require("http-errors");
const User = require("../Models/User.model");
const { authSchema, signInSchema } = require("../helpers/validation_shema");
const { signAccessToken } = require("../helpers/jwt_helper")

const Signup = async (req, res, next) => {
	try {
		const result = await authSchema.validateAsync(req.body)
		const doesExist = await User.findOne({email: result.email}) 
		if(doesExist) throw createError.Conflict(`${result.email} already registered`)

		const user = new User(result)
		const savedUser = await user.save()
        const accessToken = await signAccessToken(savedUser.id)

		res.send({accessToken}) 
	} catch (error) {
		if(error.isJoi === true) error.status = 422
		next(error)
	}
}

const Signin = async (req, res, next) => {
    try {
	const result = await signInSchema.validateAsync(req.body)
    const user = await User.findOne({email: result.email})
    
    if (!user) throw createError.NotFound("User not registered")
    
    const isMatch = await user.isValidPassword(result.password)
    
    if (!isMatch) throw createError.Unauthorized("Email/Password invalid")
    
    
    const accessToken = await signAccessToken(user.id)

	res.send({accessToken}) 
    } catch (error) {
        if (error.isJoi === true) return next(createError.BadRequest("Invalid Email/Password"))
        next(error)
    }
}

module.exports = { Signup, Signin }