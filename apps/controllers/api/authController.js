var mongoose = require("mongoose"),
  jwt = require("jsonwebtoken"),
  bcrypt = require("bcrypt"),
  User = mongoose.model("User");

exports.register = function (req, res) {
  var newUser = new User(req.body);
  newUser.hash_password = bcrypt.hashSync(req.body.password, 10);
  newUser
    .save()
    .then(function (user) {
      user.hash_password = undefined;
      return res.json(user);
    })
    .catch(function (err) {
      return res.status(400).send({
        message: err.message || "Có lỗi xảy ra khi đăng ký tài khoản.",
      });
    });
};

exports.sign_in = function (req, res) {
  User.findOne({ email: req.body.email })
    .then(function (user) {
      if (!user) {
        res.status(401).json({
          message: "Đăng nhập không thành công. Không tìm thấy người dùng.",
        });
      } else if (user) {
        if (!user.comparePassword(req.body.password)) {
          res.status(401).json({
            message: "Đăng nhập không thành công. Sai mật khẩu.",
          });
        } else {
          const { _id, fullName, email } = user;
          const accessToken = jwt.sign(
            { email: user.email, fullName: user.fullName, _id: user._id },
            "RESTFULAPIs"
          );
          return res.json({ _id, fullName, email, accessToken });
        }
      }
    })
    .catch(function (err) {
      return res.status(500).send({
        message: "Có lỗi xảy ra khi đăng nhập.",
      });
    });
};
