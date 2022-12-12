require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");
const postRoute = require("./routes/posts");
const PORT = 8000;
const mongoose = require("mongoose");
require("dotenv").config();

//connecting DB
mongoose
	.connect(process.env.MONGOURL)
	.then(() => {
		console.log("connecting DB... ");
	})
	.catch((err) => {
		console.log(err);
	});

//middle
app.use(cors());
app.use(express.json());
app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/posts", postRoute);

app.get("/", (req, res) => {
	res.send("hello express");
});

app.listen(PORT, () => console.log("server is running"));
