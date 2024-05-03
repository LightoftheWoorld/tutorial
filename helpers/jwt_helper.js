const JWT = require("jsonwebtoken");
const createError = require("http-errors");


module.exports = {
	signAccessToken: (userId) => {
		return new Promise((resolve, reject) => {
			const payload = {};
			const secret = process.env.ACCESS_TOKEN_SECRET_KEY ||"bb64af2b0ead7c09ddfebb2d46e6dadc1d204bad047a2188d2be7e9b0942a031";
			const options = {
				expiresIn: "1h",
				issuer: "FigoSavic",
				audience: userId
			};
			JWT.sign(payload, secret, options, (error, token) => {
				if (error) {
                    console.log(error.message);
                    reject(createError.InternalServerError())
                };
				resolve(token);
			});
		});
	}
}
