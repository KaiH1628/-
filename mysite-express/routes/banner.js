var express = require("express");
var router = express.Router();
require("express-async-errors");
const { formatResponse } = require("../utils/tool");
const { ValidationError } = require("../utils/errors");
const {
  getBannerService,
  updateBannerService,
} = require("../service/bannerService");

//获取首页标语
router.get("/getBanner", async function (req, res, next) {
  // console.log(req.body);
  const data = await getBannerService();
  // console.log(formatResponse(0, "", data));
  res.send(formatResponse(0, "", data));
});

//更新首页标语
router.post("/updateBanner", async function (req, res, next) {
  const data = await updateBannerService(req.body);
  // console.log(req.body)
  res.send(formatResponse(0, "", data));
});

module.exports = router;
