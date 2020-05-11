const express = require("express");
const { check } = require("express-validator/check");

const userController = require("../controller/user");
const auth = require("../middleware/auth");

const router = express.Router();

// /user/signup => POST
router.post(
	"/signup",
	[
		check("firstName", "Please Enter a Valid Firstname").not().isEmpty(),
		check("lastName", "Please Enter a Valid Lastname").not().isEmpty(),
		check("email", "Please Enter a Valid email").isEmail(),
		check("password", "Please Enter a Valid password").isLength({
			min: 6,
		}),
		check("dob", "Please Enter a Valid Date of Birth").not().isEmpty(),
	],
	userController.postAddUser
);

// /user/signin => POST
router.post(
	"/signin",
	[
		check("email", "Please Enter a Valid email").isEmail(),
		check("password", "Please Enter a Valid password").isLength({
			min: 6,
		}),
	],
	userController.postSignin
);

// To get the logged user By passing the jwt token
router.get("/me", auth, userController.getLoggedUser);

module.exports = router;
