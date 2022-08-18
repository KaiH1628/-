var express = require("express");
var router = express.Router();
require("express-async-errors");
const { formatResponse, analysisToken } = require("../utils/tool");
const { loginService, updateAdminService } = require("../service/adminService");
// const { route } = require("../app");
const { ValidationError } = require("../utils/errors");

//登录
router.post("/login", async function (req, res, next) {
  //验证码验证
  if (req.body.captcha.toLowerCase() !== req.session.captcha.toLowerCase()) {
    throw new ValidationError("验证码错误");
  }
  // console.log(req.body);

  const data = await loginService(req.body);
  res.header("authorization", data.token);
  res.send(formatResponse(0, "", data.data));
});

//恢复登录
router.get("/whoami", async function (req, res, next) {
  // console.log(req);
  const token = analysisToken(req.get("authorization"));
  //   console.log(req.get("Authoriziation"));
  // const token =req.get("authorization");
  // console.log(token);
  res.send(
    formatResponse(0, "", {
      loginId: token.loginId,
      name: token.name,
      id: token.id,
    })
  );
});

//更新管理员信息
router.put("/", async function (req, res, next) {
  // console.log(req.body);
  res.send(await updateAdminService(req.body));
});

module.exports = router;
