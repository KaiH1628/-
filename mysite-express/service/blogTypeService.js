const {
  addBlogTypeDao,
  findAllBlogTypeDao,
  findOneBlogTypeDao,
  updateBlogTypeDao,
  deleteBlogTypeDao,
} = require("../dao/blogTypeDao");
const { validate } = require("validate.js");
const { ValidationError } = require("../utils/errors");
const { formatResponse } = require("../utils/tool");

//添加分类
module.exports.addBlogTypeService = async function (newBlogType) {
  const blogTypeRule = {
    name: {
      presence: {
        allowEmpty: false,
      },
      type: "string",
    },
    order: {
      presence: {
        allowEmpty: false,
      },
      type: "integer",
    },
  };

  //进行数据验证
  const validateResult = validate.validate(newBlogType, blogTypeRule);
  if (!validateResult) {
    //数据验证通过
    newBlogType.articleCount = 0;
    const data = await addBlogTypeDao(newBlogType);
    // console.log(data);
    return formatResponse(0, "", data);
  } else {
    //数据验证失败
    throw new ValidationError("数据验证失败");
  }
};

//查询所有博客分类
module.exports.findAllBlogTypeService = async function () {
  const data = await findAllBlogTypeDao();
  const arr = data
    .map((item) => item.dataValues)
    .sort((a, b) => a.order - b.order);
  //   console.log(arr);
  return formatResponse(0, "", arr);
};

//获取一个博客分类
module.exports.findOneBlogTypeService = async function (id) {
  const data = await findOneBlogTypeDao(id);
  return formatResponse(0, "", data);
};

//修改一个博客分类
module.exports.updateBlogTypeService = async function (id, blogTypeInfo) {
  const data = await updateBlogTypeDao(id, blogTypeInfo);
  return formatResponse(0, "", data);
};

//删除一个博客分类
module.exports.deleteBlogTypeService = async function (id) {
  const data = await deleteBlogTypeDao(id);
  return formatResponse(0, "", true);
};
