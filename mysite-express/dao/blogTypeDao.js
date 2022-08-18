const blogTypeModel = require("./model/blogTypeModel");

//添加分类
module.exports.addBlogTypeDao = async function (newBlogType) {
  //   console.log(newBlogType);
  const result = await blogTypeModel.create(newBlogType);
  //   console.log(result);
  return result.dataValues;
};

//获取博客分类
module.exports.findAllBlogTypeDao = async function () {
  const result = await blogTypeModel.findAll();
  //   console.log(result);
  return result;
};

//获取一个分类
module.exports.findOneBlogTypeDao = async function (id) {
  const { dataValues } = await blogTypeModel.findByPk(id);
  // console.log(dataValues);
  return dataValues;
};

//修改一个分类
module.exports.updateBlogTypeDao = async function (id, blogTypeInfo) {
  const result = await blogTypeModel.update(blogTypeInfo, {
    where: { id },
  });
  //   console.log(result);
  const { dataValues } = await blogTypeModel.findByPk(id);
  return dataValues;
};

//删除一个分类
module.exports.deleteBlogTypeDao = async function (id) {
  //   console.log(123);
  const result = await blogTypeModel.destroy({
    where: { id },
  });
  return result;
  //   console.log(result);
};

//根据id新增对应博客的文章数量
module.exports.addBlogByIdDao = async function (id) {
  const data = await blogTypeModel.findByPk(id);
  data.articleCount++;
  await data.save();
  return;
};
