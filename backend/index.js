const express = require("express");
const cloudinary = require("cloudinary").v2;
const multer = require("multer");
const path = require("path");
require("dotenv").config();
const app = express();
cloudinary.config({
  cloud_name: process.env.cloud_name,
  api_key: process.env.api_key,
  api_secret: process.env.api_secret,
});
const fileStorage = multer.diskStorage({
  destination: "images",
});
app.use(multer({ storage: fileStorage }).array("images"));
app.use("/images", express.static(path.join(__dirname, "images")));
require("mongoose").connect(process.env.URL_MONGODB);
app.use(require("cors")());
app.use(express.json());
app.use(require("compression")());
app.use(require("helmet")());
app.use(require("./router/auth"));
app.use(require("./router/post"));
app.listen(process.env.PORT || 5000);
// Thực thi một biểu thức hàm nặc danh sau 3 giây
