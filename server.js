const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 3000;
const app = express();
app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
app.use(require("./controllers/homeRoutes"));
app.use(require("./controllers/api/workoutRoutes"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout");

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});
