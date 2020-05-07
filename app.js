const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const connectDB = require("./config/db");

const PORT = 3000;

const app = express();

const userRoutes = require("./routes/user");

app.use(express.json({ extended: false }));

// registered routes
app.use(express.static("public"));
app.use("/user", userRoutes);

app.use("*", (req, res) => {
	res.status(404).json({ success: false, msg: "Not found" });
});

app.listen(PORT, async () => {
	await connectDB();
	console.log(`App listening on port ${PORT}!`);
});

module.exports = app;
