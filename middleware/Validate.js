
module.exports = (req, res, next) => {
    if(!(req.files && req.files.image) || !req.body.title || !req.body.username || !req.body.description || !req.body.content) {
        return res.redirect("/blog/news")
    }
    next();
}


