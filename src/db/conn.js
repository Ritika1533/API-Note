const mongoose = require("mongoose");
mongoose
	.connect(
		"mongodb+srv://ritikadb:dbritika@cluster0.unqnaq8.mongodb.net/notes-db"
	)
	.then(() => {
		console.log("Successfully connected to MongoDB");
	})
	.catch((e) => {
		console.log("connection issue", message.e);
	});
