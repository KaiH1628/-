var express = require("express");
var router = express.Router();
const {
  addBlogTypeService,
  findAllBlogTypeService,
  findOneBlogTypeService,
  updateBlogTypeService,
  deleteBlogTypeService,
} = require("../service/blogTypeService");

//添加分类
router.post("/", async function (req, res, next) {
  const data = await addBlogTypeService(req.body);
  //   console.log(data);
  res.send(data);
});

//获取博客分类
router.get("/", async function (req, res, next) {
  const data = await findAllBlogTypeService();
  res.send(data);
});

//获取一个博客分类
router.get("/:id", async function (req, res, next) {
  //   console.log(req.params.id);
  const data = await findOneBlogTypeService(req.params.id);
  res.send(data);
});

//修改一个博客分类
router.put("/:id", async function (req, res, next) {
  const data = await updateBlogTypeService(req.params.id, req.body);
  res.send(data);
});

//删除一个博客分类
router.delete("/:id", async function (req, res, next) {
  const data = await deleteBlogTypeService(req.params.id);
  res.send(data);
});

module.exports = router;
