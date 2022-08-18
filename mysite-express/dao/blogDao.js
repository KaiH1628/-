const blogModel = require("./model/blogModel");
const blogTypeModel = require("./model/blogTypeModel");

//发布文章
module.exports.addBlogDao = async function (newBlogInfo) {
  // console.log(newBlogInfo);
  const result = await blogModel.create(newBlogInfo);
  return result;
};

//分页获取文章
module.exports.findBlogByPageDao = async function (pageInfo) {
  // console.log(pageInfo);

  const result = await blogModel.findAll();
  console.log(result);

  if (pageInfo.categoryId && pageInfo.categoryId !== "-1") {
    return await blogModel.findAndCountAll({
      include: [
        {
          model: blogTypeModel,
          as: "category",
          where: {
            id: pageInfo.categoryId,
          },
        },
      ],
      offset: (pageInfo.page * 1 - 1) * pageInfo.limit,
      limit: pageInfo.limit * 1,
    });
  } else {
    return await blogModel.findAndCountAll({
      include: [
        {
          model: blogTypeModel,
          as: "category",
        },
      ],
      offset: (pageInfo.page * 1 - 1) * pageInfo.limit,
      limit: pageInfo.limit * 1,
    });

    // console.log(dataValues);
  }
};

//根据id获取一篇文章
module.exports.findBlogByIdDao = async function (id) {
  // console.log(id, auth);
  return await blogModel.findByPk(id, {
    include: [
      {
        model: blogTypeModel,
        as: "category",
      },
    ],
  });
  console.log(result);
};

//修改文章
module.exports.updateBlogDao = async function (id, newBlogInfo) {
  // console.log(id, newBlogInfo);
  await blogModel.update(newBlogInfo, {
    where: {
      id,
    },
  });
  return await blogModel.findByPk(id);

};
// module.exports.updateBlogDao = async function (id, newBlogInfo) {
//   await blogModel.update(newBlogInfo, {
//     where: {
//       id: id,
//     },
//   });
//   // return await blogModel.findByPk(id);
//   // console.log(id, newBlogInfo);
// };
