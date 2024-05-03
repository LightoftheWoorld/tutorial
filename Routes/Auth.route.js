const express = require("express");
const router = express.Router();

const { Signup, Signin } = require("../controllers/Auth.controllers")


router.post("/register", Signup)

router.post("/login", Signin)


router.post("/refresh-token", async (req, res, next) => {
	res.send("refresh token route")
})


router.delete("/logout", async (req, res, next) => {
	res.send("logout route")
})

module.exports = router
