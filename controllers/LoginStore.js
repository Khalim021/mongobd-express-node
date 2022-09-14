const User = require("../models/User");
const bcrypt = require("bcrypt")

module.exports = (req, res) => {
    const {password, email} = req.body;
    User.findOne({email}, async (err, user) => {
        if(user) {
            const validPassword = await bcrypt.compare(password, user.password);
            if(validPassword) {
                res.redirect("/")
            } else {
                res.redirect("/user/login")
            }
        } else {
            return res.redirect("/user/login")
        }
    })
}









