const {
  addBlogDao,
  findBlogByPageDao,
  findBlogByIdDao,
  updateBlogDao,
} = require("../dao/blogDao");
const { validate } = require("validate.js");
const blogTypeModel = require("../dao/model/blogTypeModel");
const { ValidationError } = require("../utils/errors");
const { addBlogByIdDao } = require("../dao/blogTypeDao");
const { formatResponse, handleArray } = require("../utils/tool");

//扩展验证规则
validate.validators.categoryIdIsExist = async function (value) {
  const blogTypeInfo = blogTypeModel.findByPk(value);
  if (blogTypeInfo) {
    return;
  }
  return "CategoryId Is Not Exist";
};

//发布文章
module.exports.addBlogService = async function (newBlogInfo) {
  //   console.log(newBlogInfo);
  // 接下来，我们将处理好的TOC格式转为字符串
  newBlogInfo.toc = JSON.stringify('["a":"b"]');

  // 初始化新文章的其他信息
  newBlogInfo.scanNumber = 0; // 阅读量初始化为 0
  newBlogInfo.commentNumber = 0; // 评论数初始化为 0

  // 定义验证规则
  const blogRule = {
    title: {
      presence: {
        allowEmpty: false,
      },
      type: "string",
    },
    description: {
      presence: {
        allowEmpty: true,
      },
      type: "string",
    },
    toc: {
      presence: {
        allowEmpty: true,
      },
      type: "string",
    },
    htmlContent: {
      presence: {
        allowEmpty: false,
      },
      type: "string",
    },
    thumb: {
      presence: {
        allowEmpty: true,
      },
      type: "string",
    },
    scanNumber: {
      presence: {
        allowEmpty: false,
      },
      type: "integer",
    },
    commentNumber: {
      presence: {
        allowEmpty: false,
      },
      type: "integer",
    },
    createDate: {
      presence: {
        allowEmpty: false,
      },
      type: "integer",
    },
    categoryId: {
      presence: true,
      type: "integer",
      categoryIdIsExist: true,
    },
  };

  try {
    await validate.async(newBlogInfo, blogRule);
    const data = await addBlogDao(newBlogInfo);
    await addBlogByIdDao(newBlogInfo.categoryId);
    // console.log(data);
    return formatResponse(0, "", data);
  } catch (error) {
    throw new ValidationError("数据验证失败");
  }
};

//分页获取文章
module.exports.findBlogByPageService = async function (pageInfo) {
  // console.log(pageInfo);
  const result = await findBlogByPageDao(pageInfo);
  // console.log(result);
  const rows = handleArray(result.rows);
  // console.log(rows);
  rows.forEach((item) => {
    item.toc = JSON.parse(item.toc);
  });
  return formatResponse(0, "", {
    total: result.count,
    rows: rows,
  });
};

//根据id获取某一篇文章
module.exports.findBlogByIdService = async function (id, auth) {
  // console.log(id, auth);
  const result = await findBlogByIdDao(id);

  result.dataValues.toc = JSON.parse(result.dataValues.toc);
  // console.log(result);
  if (auth) {
    result.scanNumber++;
    await result.save();
  }

  return formatResponse(0, "", result.dataValues);
};

//修改文章
module.exports.updateBlogService = async function (id, newBlogInfo) {
  // console.log(id, newBlogInfo);
  if (newBlogInfo.htmlContent) {
    newBlogInfo.toc = JSON.stringify('["a":"b"]');
  }
  const { dataValues } = await updateBlogDao(id, newBlogInfo);
  // console.log(dataValues);
  return formatResponse(0, "", dataValues);
};
