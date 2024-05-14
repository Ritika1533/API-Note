const mongoose = require("mongoose");
const NotesSchema = new mongoose.Schema(
	{
		Title: {
			type: String,
			required: true,
		},
		description: {
			type: String,
		},
		userId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		category: {
			type: String,
			required: true,
		},
	},
	{ timestamps: true }
);

const Note = new mongoose.model("Note", NotesSchema);
module.exports = Note;
