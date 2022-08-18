var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var { expressjwt: jwt } = require("express-jwt");
// var { unless } = require("express-unless");
// jwt.unless = unless;
const md5 = require("md5");
const session = require("express-session");
const {
  ForbiddenError,
  ServiceError,
  UnKnownError,
} = require("./utils/errors");

//默认读取项目根目录下的.env环境变量文件
require("dotenv").config();
//引入数据库连接
require("./dao/db");

//引入路由
var adminRouter = require("./routes/admin");
require("express-async-errors");
var captchaRouter = require("./routes/captcha");
var bannerRouter = require("./routes/banner");
// var uploadRouter = require("./routes/upload");
var blogTypeRouter = require("./routes/blogType");
var blogRouter = require("./routes/blog");

//创建服务器实例
var app = express();

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
  })
);

//使用中间件
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

//验证token接口
app.use(
  jwt({
    secret: md5(process.env.JWT_SECRET),
    algorithms: ["HS256"],
  }).unless({
    path: ["/api/admin/login", "/res/captcha", "/api/banner/getBanner"],
    // path: [ "/" ],
    // path: [
    //   { url: "/api/admin/login", methods: ["post"] },
    //   { url: "/res/captcha", methods: ["get"] },
    //   { url: "/api/banner/getBanner", methods: ["get"] },
    //   { url: "/api/blog", methods: ["get"] },
    // ],
  })
);

//使用路由中间件
app.use("/api/admin", adminRouter);
// app.use("/api/upload", uploadRouter);
app.use("/res/captcha", captchaRouter);
app.use("/api/banner", bannerRouter);
app.use("/api/blogType", blogTypeRouter);
app.use("/api/blog", blogRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// 错误处理
app.use(function (err, req, res, next) {
  if (err.name === "UnauthorizedError") {
    res.send(new ForbiddenError("未登录，或登录已失效").toResponseJSON());
  } else if (err instanceof ServiceError) {
    res.send(err.toResponseJSON());
  } else {
    res.send(new UnKnownError().toResponseJSON());
  }
});

module.exports = app;
