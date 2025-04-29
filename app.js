const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const blogRoutes = require("./routes/blogRoutes");
// express app
const app = express();

// connect to mongoDB
const dbURI =
  "mongodb+srv://netninja:test1234@cluster0.cli16.mongodb.net/note-tuts?retryWrites=true&w=majority&appName=Cluster0";
mongoose
  .connect(dbURI)
  .then((result) => app.listen(3000)) //console.log("connected to db"))
  .catch((err) => console.log(err));
// register view engine
app.set("view engine", "ejs");

// listen for request

// meddleware & static files
app.use(express.static("public"));
app.use(express.urlencoded());
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.redirect("/blogs");
});

app.get("/about", (req, res) => {
  res.render("about", { title: "About" });
});

// blog routes
app.use("/blogs", blogRoutes);

app.use((req, res) => {
  res.status(404).render("404", { title: "404" });
});
