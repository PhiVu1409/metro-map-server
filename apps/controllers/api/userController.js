var express = require("express");
const { ObjectId } = require("mongodb");
var router = express.Router();
var UserService = require("../../services/userService");

router.get("/", async function (req, res) {
    var userService = new UserService();
    var users = await userService.getUserList();
    res.json(users);
});
router.delete("/deleteuser", async function (req, res) {
    var userService = new UserService();
    var result = await userService.deleteUser(req.query.id);
    res.json({ status: true, message: "Xóa user thành công" });
});
module.exports = router;