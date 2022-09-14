const express = require("express");
const app = express();
const expressEdge = require("express-edge");
const mongoose = require("mongoose");
const fileUpload = require("express-fileupload");
const expressSession = require("express-session");
const mongoStore = require("connect-mongo");
const connectFlash = require("connect-flash");
const authMiddleware = require("./middleware/Auth");
const redirectIfAuth = require("./middleware/Redirect");
const validateMiddleware = require("./middleware/Redirect");

const getHomeController = require("./controllers/Home");
const getBlogsController = require("./controllers/Blogs");
const getCreateBlogController = require("./controllers/CreateBlog");
const getAboutController = require("./controllers/About");
const getContactController = require("./controllers/Contact");
const getCreateBlogContoller = require("./controllers/CreateBlogs");
const getRegisterUserController = require("./controllers/RegisterUser");
const getCreateUserStoreController = require("./controllers/CreateUserStore");
const getLoginController = require("./controllers/Login");
const getLoginStoreController = require("./controllers/LoginStore");
const getLogoutController = require("./controllers/Logout");

const mongodbUrl = "mongodb+srv://theStiles:nodeAlpha175069@clusterdb.sokj3z1.mongodb.net/node-sflix"

mongoose.connect(mongodbUrl);

app.set("views", `${__dirname}/views`);

app.use(connectFlash());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(fileUpload());
app.use(express.static("public"))
app.use(expressEdge.engine);
app.use(expressSession({secret: "stiles", store: mongoStore.create({mongoUrl: mongodbUrl})}));

app.use("*", (req, res, next) => {
    app.locals.auth = req.session.userId
    next();
})

app.get("/", getHomeController);

app.get("/about", getAboutController);

app.get("/blogs/:id", getBlogsController);

app.get("/blog/news", authMiddleware, getCreateBlogController);

app.get("/contact", getContactController);

app.get("/auth/reg", redirectIfAuth, getRegisterUserController);

app.get("/user/login", redirectIfAuth, getLoginController);

app.get("/logout", authMiddleware, getLogoutController);

app.post("/blog/create", authMiddleware, validateMiddleware, getCreateBlogContoller);
app.post("/user/auth", getCreateUserStoreController);
app.post("/login/user", getLoginStoreController);




app.listen(5000, () => { console.log("Server started on Port 5000...")})


