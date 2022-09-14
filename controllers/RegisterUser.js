module.exports = (req, res) => {
    res.render("register", {
        errors: req.flash("regError"),
        data: req.flash("data")[0]
    })
};





