const express = require("express");
const app = express();
const expressEdge = require("express-edge");
const mongoose = require("mongoose");
const Post = require("./models/Post");

app.use(express.static("public"));
app.use(expressEdge.engine);
app.set("views", `${__dirname}/views`);
mongoose.connect("mongodb+srv://theStiles:nodeAlpha175069@clusterdb.sokj3z1.mongodb.net/node-sflix");
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get("/", (req, res) => {
    res.render("home")
});

app.get("/about", (req, res) => {
    res.render("about")
});

app.get("/blogs", (req, res) => {
    res.render("blogs")
});

app.get("/blog/news", (req, res) => {
    res.render("create")
});

app.get("/contact", (req, res) => {
    res.render("contact")
});

app.post("/blog/create", (req, res) => {
    Post.create(req.body, (err, post) => {
        res.redirect("/")
    })
})




app.listen(5000, () => { console.log("Server started on Port 5000...")})
