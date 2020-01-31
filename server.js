// REQUIRED PACKAGES IN ORDER TO RUN - MORGAN TO SHOW SPECS OF APPLICATION

const express = require("express");
const mongoose = require("mongoose");
const logger = require("morgan");


// WEBSITE DEPLOYED ON GIVEN PORT OR 8080 IF LOCAL
const PORT = process.env.PORT || 8080;

// EXPRESS METHOD = APP
const app = express();


// ENCODED JSON - NEEDED
app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// LETTING APPLICATION KNOW THERE IS A PUBLIC FOLDER 
app.use(express.static("public"));

// CONNECTING TO MONGO DATABASE 
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", {
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true 
});


// REQUIRING ROUTES FOR PAGES TO WORK
require("./routes/htmlRoutes.js")(app);
require("./routes/apiRoutes.js")(app);

// APPLICATION IS STARTING 
app.listen(PORT, () => {
  console.log(`APP RUNNING ON PORT:  ${PORT}!`);
});