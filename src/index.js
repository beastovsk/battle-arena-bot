const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require("dotenv");
const gameRouter = require("./routes/gameRouter"); // Import game router

dotenv.config();

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan("dev"));

// Routes
app.use("/game", gameRouter); // Mount game router at /game path

// Error handling middleware
app.use((err, req, res, next) => {
	console.error(err.stack);
	res.status(500).send("Something went wrong!");
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
