const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../model/user");

exports.signup = async (req, res) => {
  try {
    // const existUser = await User.exists({ email: req.body.email });
    // if (existUser) return res.status(400).json({ message: "Email đã tồn tại" });
    req.body.password = await bcrypt.hash(req.body.password, 10);
    const newUser = new User(req.body);
    await newUser.save();
    res.status(201).json({ message: "Đăng kí thành công" });
  } catch (error) {
    console.log(error);
    // res.status(500).json({ error });
    if (error.code === 11000 && error.keyPattern && error.keyPattern.email) {
      // Mã lỗi 11000 thường đại diện cho lỗi duplicate key trong MongoDB
      // keyPattern.email là tên của trường trong lỗi
      res.status(400).json({ message: "Email đã được sử dụng" });
    } else {
      console.log(error);
      res.status(500).json({ error });
    }
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ email: "Email không tồn tại" });
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      return res.status(401).json({ password: "Sai mật khẩu" });
    }
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_client);

    return res.json(token);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
};
