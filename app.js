const express = require("express");
require("dotenv").config({ debug: process.env.DEBUG });
const session = require("express-session");
const MongoStore = require('connect-mongo');
const flash = require("connect-flash");
const mongoose = require("mongoose")
const resumeRoutes = require("./src/routes/resume.route");

const app = express();


// connect to mongoDB
(async() => {
  try {

    const connectmDB = await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true , useCreateIndex: true, useFindAndModify: false });

    if(connectmDB) {
    console.log(`Connected to DB`);
    }

  } catch (err) {
    console.log(`Failed to connect to DB ${err}`);
  }
})();

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(session({
  store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }),
  secret: process.env.SECRET,
  resave: true,
  saveUninitialized: true
}));
app.use(flash());

app.use((req, res, next) => {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error = req.flash("error");
  next();
});


app.get("/", (req, res) => {
  res.redirect("/resume");
});

app.use("/resume", resumeRoutes);

app.use( (req, res, next) => {
  let error = new Error("Page Not Found");
  error.status = 404;
  next(error);
});

app.use( (req, res, next) => {
  res.status(error.status || 500).json({
    message: error.message
  });
});

module.exports = app;
