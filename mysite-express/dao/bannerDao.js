const bannerModel = require("./model/bannerModel");
const { handleArray } = require("../utils/tool");

//获取首页标语
module.exports.getBannerDao = async function () {
  const data = await bannerModel.findAll();
  return handleArray(data);
};

//更新首页标语
module.exports.updateBannerDao = async function (bannerArr) {
  // 将表的记录全部删除掉
  await bannerModel.destroy({
    truncate: true,
  });
  await bannerModel.bulkCreate(bannerArr); // 批量写入数据
  const data = await bannerModel.findAll();
  return handleArray(data);
    // console.log(bannerArr);
};
