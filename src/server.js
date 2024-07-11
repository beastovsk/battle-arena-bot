const express = require("express");
const bodyParser = require("body-parser");
const userRoutes = require("./routes/userRoutes");
const matchRoutes = require("./routes/matchRoutes");

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use("/api/users", userRoutes);
app.use("/api/matches", matchRoutes);

app.listen(port, () => {
	console.log(`Server running on port ${port}`);
});
