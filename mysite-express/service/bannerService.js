const { getBannerDao, updateBannerDao } = require("../dao/bannerDao");
const { ValidationError } = require("../utils/errors");
const { formatResponse } = require("../utils/tool");

//获取首页标语
module.exports.getBannerService = async function () {
  const data = await getBannerDao();
  //   console.log(data);
  return data;
};

//更新首页标语
module.exports.updateBannerService = async function (bannerArr) {
    const data = await updateBannerDao(bannerArr);
//   console.log(bannerArr);
    // console.log(data);
    return data;
};
