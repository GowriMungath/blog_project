// packages are imported
import express from "express";

// server is set up
const app = express();
const port = 3000;

// setting view engine
app.set("view engine", "ejs");

// middleware configuration
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));


// routes defined
app.get("/", (req, res) => {
  res.render("index.ejs",{icon:"home", blogPosts:blogPosts});
});

app.get("/create", (req, res) => {
  res.render("create_blog.ejs",{icon:"new"});
});

let blogPosts = [];
app.post("/create", (req, res) => {
  const { title, description } = req.body;
  if (title && description) {
    blogPosts.push({ title, description });
  }
  res.redirect("/"); 
});

app.post("/delete/:id", (req, res) => {
  const id = parseInt(req.params.id);
  if (!isNaN(id)) {
    blogPosts.splice(id, 1);
  }
  res.redirect("/");
});

app.get("/edit/:id", (req, res) => {
  const id = parseInt(req.params.id);
  if (!isNaN(id) && blogPosts[id]) {
    res.render("edit_blog", { id, post: blogPosts[id] });
  } else {
    res.redirect("/");
  }
});

app.post("/edit/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const { title, description } = req.body;
  if (!isNaN(id) && blogPosts[id] && title && description) {
    blogPosts[id] = { title, description };
  }
  res.redirect("/");
});

// server started
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
