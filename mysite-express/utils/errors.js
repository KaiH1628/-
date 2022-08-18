const { formatResponse } = require("./tool");
/**
 * 错误处理类
 */
class ServiceError extends Error {
  /**
   *
   * @param {*} message 错误信息
   * @param {*} code 错误消息码
   */
  constructor(message, code) {
    super(message);
    this.code = code;
  }

  //方法
  toResponseJSON() {
    return formatResponse(this.code, this.message, null);
  }
}

//文件上传错误
exports.UploadError = class extends ServiceError {
  constructor(message) {
    super(message, 401);
  }
};

//禁止访问错误
exports.ForbiddenError = class extends ServiceError {
  constructor(message) {
    super(message, 401);
  }
};

//验证错误
exports.ValidationError = class extends ServiceError {
  constructor(message) {
    super(message, 406);
  }
};

//无资源错误
exports.NotFoundError = class extends ServiceError {
  constructor() {
    super("not found", 406);
  }
};

//未知错误
exports.UnKnownError = class extends ServiceError {
  constructor() {
    super("server interal error", 500);
  }
};

module.exports.ServiceError = ServiceError;
