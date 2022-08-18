const { loginDao, updateAdminDao } = require("../dao/adminDao");
const jwt = require("jsonwebtoken");
const md5 = require("md5");
const { ValidationError } = require("../utils/errors");
const { formatResponse } = require("../utils/tool");

//登录
module.exports.loginService = async function (loginInfo) {
  loginInfo.loginPwd = md5(loginInfo.loginPwd);

  let data = await loginDao(loginInfo);
  // console.log(data)
  if (data && data.dataValues) {
    data = {
      id: data.dataValues.id,
      loginId: data.dataValues.loginId,
      name: data.dataValues.name,
    };
    let loginPeriod = null;
    if (loginInfo.remember) {
      loginPeriod = parseInt(loginInfo.remember);
    } else {
      loginPeriod = 1;
    }
    const token = jwt.sign(data, md5(process.env.JWT_SECRET), {
      expiresIn: 60 * 60 * 24 * loginPeriod,
    });
    return {
      token,
      data,
    };
  }
  return data;
};

//更新
module.exports.updateAdminService = async function (accountInfo) {
  //根据传入账号信息，查询用户
  const adminInfo = await loginDao({
    loginId: accountInfo.loginId,
    loginPwd: md5(accountInfo.oldLoginPwd),
  });

  // console.log(adminInfo);

  if (adminInfo && adminInfo.dataValues) {
    const newPassWord = md5(accountInfo.loginPwd);
    await updateAdminDao({
      name: accountInfo.name,
      loginId: accountInfo.loginId,
      loginPwd: newPassWord,
    });

    return formatResponse(0, "", {
      loginId: accountInfo.loginId,
      name: accountInfo.name,
      id: adminInfo.dataValues.id,
    });
  } else {
    throw new ValidationError("旧密码不正确");
    // console.log("旧密码错误");
  }
};
