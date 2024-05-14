const jwt = require("jsonwebtoken");
const SECRET_KEY = "NOTESAPI";

const auth = (req, res, next) => {
	try {
		let token = req.headers.authorization;
		if (token) {
			// Check if token exists
			token = token.split(" ")[1];
			let user = jwt.verify(token, SECRET_KEY);
			req.userId = user.id;
			next();
		} else {
			res.status(401).send("Unauthorized login");
		}
	} catch (e) {
		res.status(401).send("Unauthorized login");
	}
};

module.exports = auth;
