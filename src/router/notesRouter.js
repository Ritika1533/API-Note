const express = require("express");
const noteRouter = new express.Router();
const Note = require("../model/note");
const auth = require("../middleware/auth");

//create notes
noteRouter.post("/note", auth, async (req, res) => {
	const { Title, description, category } = req.body;
	const newNote = new Note({
		Title: Title,
		description: description,
		userId: req.userId,
		category: category,
	});
	try {
		await newNote.save();
		res.status(201).send("successfully recorded");
	} catch (e) {
		res.status(500).send(e);
	}
});

//get notes
noteRouter.get("/note", auth, async (req, res) => {
	try {
		const notes = await Note.find({ userId: req.userId });
		res.status(200).send(notes);
	} catch (e) {
		res.status(500).send(e);
	}
});

//get indivisual notes
noteRouter.get("/note/:id", auth, async (req, res) => {
	const noteId = req.params.id; // No need to use await here
	try {
		const getIndNote = await Note.findOne({ _id: noteId, userId: req.userId });
		if (!getIndNote) {
			return res.status(404).send("Note not found");
		}
		res.status(200).send(getIndNote);
	} catch (e) {
		res.status(500).send(e);
	}
});

//update notes
noteRouter.patch("/note/:id", auth, async (req, res) => {
	const noteId = req.params.id;
	const { Title, description, category } = req.body;
	const updateFields = {
		Title,
		description,
		category,
	};

	try {
		const updatedNote = await Note.findByIdAndUpdate(noteId, updateFields, {
			new: true,
		});

		if (!updatedNote) {
			return res.status(404).send("Note not found");
		}

		res.send(updatedNote);
	} catch (e) {
		res.status(500).send(e);
	}
});

//delete notes
noteRouter.delete("/note/:id", auth, async (req, res) => {
	const noteId = req.params.id;
	try {
		const deletedNote = await Note.findOneAndDelete({ _id: noteId });
		if (!deletedNote) {
			return res.status(404).send("Note not found");
		}
		res.send(deletedNote);
	} catch (e) {
		res.status(500).send(e);
	}
});

module.exports = noteRouter;
