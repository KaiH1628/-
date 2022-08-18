// var express = require("express");
// var router = express.Router();
// const multer = require("multer");
// const path = require("path");
// const { upload, formatResponse } = require("../utils/tool");

// router.post("/", async function (req, res, next) {
// //   console.log(req);
//     upload.single("file")(req, res, function (err) {
//         console.log(req);
//         console.log(res);
//   // if (err instanceof multer.MulterError) {
//   //   // 发生错误
//   //   next(new UploadError("上传文件失败，请检查文件的大小，控制在2MB以内"));
//   // } else {
//   //   //正常
//   // //   console.log(req.file);
//   //   //   const path = "/static/uploads/" + req.file.filename;
//   //   //   res.send(formatResponse(0, "", path));
//   //   //   console.log(file.filename);
//   // }
//     });
// });

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     console.log(file);

//     // const path = path.resolve(__dirname, "../public/static/uploads/");
//     cb(null, path.resolve(__dirname, "../public/static/uploads/"));
//   },
//   filename: function (req, file, cb) {
//     // const basename = path.basename(
//     //   file.originalname,
//     //   path.extname(file.originalname)
//     // );
//     // const extname = path.extname(file.originalname);
//     // const newName =
//     //   basename +
//     //   new Date().getTime() +
//     //   Math.floor(Math.random() * 9000 + 1000) +
//     //   extname;
//     // // console.log(newName);
//     // // console.log(extname);
//     // cb(null, newName);
//     const timeStamp = Date.now();
//     const randomStr = Math.random().toString(36).slice(-6);
//     const ext = path.extname(file.originalname);
//     const filename = `${timeStamp}-${randomStr}${ext}`;

//     cb(null, filename);
//   },
// });

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     // console.log(file);
//     // const path = path.resolve(__dirname,"uploads/");
//     // console.log(path);
//     cb(null, "F:/Users/KaiH/Desktop/node project/mysite-express/uploads");
//   },
//   filename: function (req, file, cb) {
//     cb(null, file.fieldname + "-" + Date.now());
//   },
// });

// const upload = multer({ storage: storage });
// // const upload = multer({ dest: "uploads/" });

// router.post("/", upload.single("file"), function (req, res, next) {
//   // req.file 是 `avatar` 文件的信息
//   // console.log(req.file);
//   //   console.log(req.body);
//   // req.body 将具有文本域数据，如果存在的话
//   res.send("上传完成");
// });

// module.exports = router;


var express = require("express");
const multer = require("multer");
const { UploadError } = require("../utils/errors");
const { uploading, formatResponse } = require("../utils/tool");
var router = express.Router();


router.post("/", async function (req, res, next) {
  // single 方法里面书写上传控件的 name 值
  uploading.single("file")(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      next(new UploadError("上传文件失败，请检查文件的大小，控制在 2MB 以内"));
    } else {
      const path = "/static/uploads/" + req.file.filename;
      res.send(formatResponse(0, "", path));
    }
  });
});

module.exports = router;