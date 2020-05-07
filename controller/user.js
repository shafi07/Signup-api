const { validationResult } = require("express-validator/check");
const bcrypt = require("bcryptjs");

const User = require("../model/user");

module.exports = {
	/**
	 * @description The incoming user POST request and save to db.
	 * @param {Object} req - which includes firstname,lastname,email,password,date of birth
	 * @param {Object} res - The respnose that send backs for each request.
	 */

	postAddUser: async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({
				success: false,
				errors: errors.array(),
			});
		}

		const { firstName, lastName, email, password, dob } = req.body;

		try {
			// Checking for the existing user
			let existingUser = await User.findOne({
				email,
			});
			if (existingUser) {
				return res.status(409).json({
					success: false,
					msg: "User Already Exists",
				});
			}
			//Creating new user instances
			const user = new User({
				firstName,
				lastName,
				email,
				password,
				dob,
			});

			const hashPassword = await bcrypt.hashSync(password, 10); // Hasing the password
			user.password = hashPassword;

			await user.save(); // Saving new user to mongodb User collection
			res.status(200).json({ success: true, msg: "Successfully Registered" });
		} catch (error) {
			res.status(500).json("server error");
		}
	},
};
