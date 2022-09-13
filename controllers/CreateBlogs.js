const Post = require("../models/Post");
const path = require("path");

module.exports = (req, res) => {
    const {image} = req.files;
    image.mv(path.resolve(__dirname, "..", "public/images", image.name), (err) => {
    if(err) throw err;
    Post.create({...req.body, image: `/images/${image.name}`}, (err, post) => {
        res.redirect("/")
    });
   });
}














