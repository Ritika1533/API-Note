const express = require("express");
const userRouter = new express.Router();
const User = require("../model/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const SECRET_KEY = "NOTESAPI";
userRouter.post("/register", async (req, res) => {
	//existing user check
	const { name, email, password } = req.body;
	try {
		const existingUser = await User.findOne({ email });
		if (existingUser) {
			return res.status(400).send("user already exist");
		}
		//hashing password
		const hashedPassword = await bcrypt.hash(password, 10);

		//user creation
		const result = await User.create({
			email: email,
			password: hashedPassword,
			name: name,
		});

		//token generate
		const token = jwt.sign({ email: result.email, id: result._id }, SECRET_KEY);
		res.status(201).json({ user: result, token: token });
	} catch (e) {
		res.status(500).send(e);
	}
});
userRouter.post("/login", async (req, res) => {
	const { email, password } = req.body;
	try {
		//checking user exists or not
		const existingUser = await User.findOne({ email });
		if (!existingUser) {
			return res.status(404).send("user not found");
		}
		//password check
		const matchPassword = await bcrypt.compare(password, existingUser.password);
		if (!matchPassword) {
			return res.status(400).json({ message: "password not matched" });
		}
		const token = jwt.sign(
			{ email: existingUser.email, id: existingUser._id },
			SECRET_KEY
		);
		res.status(201).json({ user: existingUser, token: token });
	} catch (e) {
		res.status(400).send(e);
	}
});

module.exports = userRouter;
