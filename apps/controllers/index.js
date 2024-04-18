var express = require("express");
var router = express.Router();
router.use("/api/v1/trainlines", require(__dirname + "/api/trainLineController"));
router.use("/api/v1/train", require(__dirname + "/api/trainController"));
router.use("/api/v1/user", require(__dirname + "/api/userController"));

router.get("/", function(req,res){
    res.json({"message": "this is index page"});
});
module.exports = router;