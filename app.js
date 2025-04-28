const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const Blog = require("./models/blog");

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

// mongoose and mongo sandbox routes
// app.get("/add-blog", (req, res) => {
//   const blog = new Blog({
//     title: "uusi blogi 2",
//     snippet: "Uudesta blogistani",
//     body: "lisää uudesta blogistani",
//   });
//   blog
//     .save()
//     .then((result) => {
//       res.send(result);
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// });

// app.get("/all-blogs", (req, res) => {
//   Blog.find()
//     .then((result) => {
//       res.send(result);
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// });

// app.get("/single-blog", (req, res) => {
//   Blog.findById("680b5c48cf2183e167deb735")
//     .then((result) => {
//       res.send(result);
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// });
// app.use((req, res, next) => {
//   console.log("New request made:");
//   console.log("Host: ", req.hostname);
//   console.log("Path: ", req.path);
//   console.log("Method: ", req.method);
//   next();
// });

// app.use((req, res, next) => {
//   console.log("In the next middleware");
//   next();
// });

app.get("/", (req, res) => {
  // const blogs = [
  //   {
  //     title: "Yoshi finds eggs",
  //     snippet: "Lorem ipsum dolor sit amet consectetur",
  //   },
  //   {
  //     title: "Mario finds stars",
  //     snippet: "Lorem ipsum dolor sit amet consectetur",
  //   },
  //   {
  //     title: "How to defeat browser",
  //     snippet: "Lorem ipsum dolor sit amet consectetur",
  //   },
  // ];
  // res.render("index", { title: "Home", blogs });
  res.redirect("/blogs");
});

app.get("/about", (req, res) => {
  res.render("about", { title: "About" });
});

// blog routes

app.get("/blogs", (req, res) => {
  Blog.find()
    .sort({ createdAt: -1 })
    .then((result) => {
      res.render("index", { title: "All blogs", blogs: result });
    })
    .catch((err) => {
      console.log(err);
    });
});

app.post("/blogs", (req, res) => {
  const blog = new Blog(req.body);
  blog
    .save()
    .then((result) => {
      res.redirect("/blogs");
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get("/blogs/create", (req, res) => {
  res.render("create", { title: "New Blog" });
});

app.get("/blogs/:id", (req, res) => {
  const id = req.params.id;
  Blog.findById(id)
    .then((result) => {
      res.render("details", { blog: result, title: "Blog Details" });
    })
    .catch((err) => {
      console.log(err);
    });
});

app.delete("/blogs/:id", (req, res) => {
  const id = req.params.id;
  Blog.findByIdAndDelete(id)
    .then((result) => {
      res.json({ redirect: "/blogs" });
    })
    .catch((err) => {
      console.log(err);
    });
});

app.use((req, res) => {
  res.status(404).render("404", { title: "404" });
});
