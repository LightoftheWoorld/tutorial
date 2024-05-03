const bcrypt = require("bcrypt")
const mongoose = require("mongoose");
const Schema = mongoose.Schema

const validSexValues = ["male", "female"];

const UserSchema = new Schema({
	email:{
		type: String,
		required: true,
		lowercase: true,
		unique: true,
		trim: true // Remove whitespace from the beginning and end of the string
	},
	password:{
		type: String,
		required: true,
	},
	firstname: {
		type: String,
		required: true,
		trim: true // Remove whitespace from the beginning and end of the string
	},
	middlename: {
		type: String,
		trim: true // Trim whitespace from the beginning and end of the string (not required)
	},
	lastname: {
		type: String,
		required: true,
		trim: true // Trim whitespace from the beginning and end of the string
	},
	sex: {
		type: String,
		required: true,
		lowercase: true,
		validate: {
			validator: function(value) {
				return validSexValues.includes(value); // Check if value is in the valid sex values array
			},
			message: "Sex must be either 'male' or 'female'."
		}
	},

})

UserSchema.pre("save", async function (next) {
    try {
       const salt = await bcrypt.genSalt(10)
       const hashedPassword = await bcrypt.hash(this.password, salt)
       this.password = hashedPassword
       next()
    } catch (error) {
        next(error)
    }
})

UserSchema.methods.isValidPassword = async function(password){
    try {
        return await bcrypt.compare(password, this.password)
    } catch (error) {
        throw error
    }
}

const User = mongoose.model('user', UserSchema)

module.exports = User
