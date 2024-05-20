const express = require("express");
require("./db/conn");
const app = express();
const port = process.env.PORT || 3000;
const User = require("./model/user");
const Note = require("./model/note");
const userRouter = require("./router/userRouter");
const noteRouter = require("./router/notesRouter");
const cors = require("cors");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(userRouter);
app.use(noteRouter);
app.use(cors());

app.get("/", (req, res) => {
	res.send("hello ritika");
});

app.listen(port, (req, res) => {
	console.log(`listening at port localhost:${port}`);
});
