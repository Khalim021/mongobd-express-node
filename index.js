const express = require("express");
const app = express();
const expressEdge = require("express-edge");
const mongoose = require("mongoose");
const Post = require("./models/Post");
const fileUpload = require("express-fileupload");
const path = require("path");
const getHomeController = require("./controllers/Home");
const getBlogsController = require("./controllers/Blogs");
const getCreateBlogController = require("./controllers/CreateBlog");
const getAboutController = require("./controllers/About");
const getContactController = require("./controllers/Contact");
const getCreateBlogContoller = require("./controllers/CreateBlogs");

app.use(express.static("public"));
app.use(expressEdge.engine);
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(fileUpload());
app.set("views", `${__dirname}/views`);
mongoose.connect("mongodb+srv://theStiles:nodeAlpha175069@clusterdb.sokj3z1.mongodb.net/node-sflix");

const validateMiddleware = (req, res, next) => {
    if(!(req.files && req.files.image) || !req.body.title || !req.body.username || !req.body.description || !req.body.content) {
        return res.redirect("/blog/news")
    }
    next();
}

app.get("/", getHomeController);

app.get("/about", getAboutController);

app.get("/blogs/:id", getBlogsController);

app.get("/blog/news", getCreateBlogController);

app.get("/contact", getContactController);

app.post("/blog/create", validateMiddleware, getCreateBlogContoller);




app.listen(5000, () => { console.log("Server started on Port 5000...")})
