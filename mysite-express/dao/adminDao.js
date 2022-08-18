const adminModel = require("./model/adminModel");
const md5 = require("md5");

//登录
module.exports.loginDao = async function (loginInfo) {
  //   console.log(loginInfo,"ncds");
  return await adminModel.findOne({
    where: {
      loginId: loginInfo.loginId,
      loginPwd: loginInfo.loginPwd,
    },
  });
  //   console.log(data.dataValues);
};

//更新
module.exports.updateAdminDao = async function (newAccountInfo) {
  // console.log(accountInfo);
  return await adminModel.update(newAccountInfo, {
    where: {
      loginId: newAccountInfo.loginId,
    },
  });
};
