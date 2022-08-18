var express = require("express");
var router = express.Router();
const {
  addBlogService,
  findBlogByPageService,
  findBlogByIdService,
  updateBlogService,
} = require("../service/blogService");

//发布文章
router.post("/", async function (req, res, next) {
  // console.log(123)
  const data = await addBlogService(req.body);
  res.send(data);
});

//分页获取文章
router.get("/", async function (req, res, next) {
  // console.log(req.query);
  const data = await findBlogByPageService(req.query);
  res.send(data);
});

//获取单篇文章
router.get("/:id", async function (req, res, next) {
  const data = await findBlogByIdService(
    req.params.id,
    req.headers.authorization
  );
  // console.log(req.params);
  // console.log(req.headers);
  res.send(data);
});

//修改文章
router.put("/:id", async function (req, res, next) {
  // console.log(req.params.id, req.body);
  const data = await updateBlogService(req.params.id, req.body);
  // console.log(data);
  res.send(data);
});

//删除文章
router.delete("/:id", async function (req, res, next) {
  res.send(await deleteBlogService(req.params.id));
});

module.exports = router;
