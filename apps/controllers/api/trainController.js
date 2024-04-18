var express = require("express");
const { ObjectId } = require("mongodb");
var router = express.Router();
var Train = require("../../model/train");
var TrainService = require("../../services/trainService");

router.get("/", async function (req, res) {
    var trainService = new TrainService();
    var trains = await trainService.getTrainList();
    res.json(trains);
});
router.get("/trainbyidtrainline", async function (req, res) {
    var trainService = new TrainService();
    var trains = await trainService.getTrainListByIdTrainLine(req.query.idTrainLine);
    res.json(trains);
});
router.get("/train", async function (req, res) {
    var trainService = new TrainService();
    var train = await trainService.getTrainById(req.query.id);
    res.json(train);
});
router.post("/inserttrain", async function (req, res) {
    var trainService = new TrainService();
    var train = new Train();
    train.sTTGa = req.body.sTTGa;
    train.tenGa = req.body.tenGa;
    train.thoiGian = req.body.thoiGian;
    train.diaChi = req.body.diaChi;
    train.lat = req.body.lat;
    train.lng = req.body.lng;
    train.moTa = req.body.moTa;
    train.trangThai = req.body.trangThai;
    train.idTrainLine = req.body.idTrainLine;
    var result = await trainService.insertTrain(train);
    res.json({ status: true, message: "Thêm mới ga tàu thành công." });
});
router.put("/updatetrain", async function (req, res) {
    var trainService = new TrainService();
    var train = new Train();
    train._id = new ObjectId(req.query.id);
    train.sTTGa = req.body.sTTGa;
    train.tenGa = req.body.tenGa;
    train.thoiGian = req.body.thoiGian;
    train.diaChi = req.body.diaChi;
    train.lat = req.body.lat;
    train.lng = req.body.lng;
    train.moTa = req.body.moTa;
    train.trangThai = req.body.trangThai;
    train.idTrainLine = req.body.idTrainLine;
    var result = await trainService.updateTrain(train);
    res.json({ status: true, message: "Cập nhật ga tàu thành công." });
});
router.delete("/deletetrain", async function (req, res) {
    var trainService = new TrainService();
    var result = await trainService.deleteTrain(req.query.id);
    res.json({ status: true, message: "Xóa ga tàu thành công" });
});
module.exports = router;