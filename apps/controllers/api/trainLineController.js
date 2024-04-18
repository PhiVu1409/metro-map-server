var express = require("express");
const { ObjectId } = require("mongodb");
var router = express.Router();
var TrainLine = require("../../model/trainLine");
var TrainLineService = require("../../services/trainLineService");

router.get("/", async function (req, res) {
    var trainLineService = new TrainLineService();
    var trainLine = await trainLineService.getTrainLineList();
    res.json(trainLine);
});
router.get("/trainline", async function (req, res) {
    var trainLineService = new TrainLineService();
    var trainLine = await trainLineService.getTrainLineById(req.query.id);
    res.json(trainLine);
});
router.post("/inserttrainline", async function (req, res) {
    var trainLineService = new TrainLineService();
    var trainLine = new TrainLine();
    trainLine.soTuyenTau = req.body.soTuyenTau;
    trainLine.tenTuyenTau = req.body.tenTuyenTau;
    trainLine.doDaiTuyenTau = req.body.doDaiTuyenTau;
    trainLine.thoiGianBatDau = req.body.thoiGianBatDau;
    trainLine.thoiGianKetThuc = req.body.thoiGianKetThuc;
    trainLine.giaVe = req.body.giaVe;
    trainLine.khuVuc = req.body.khuVuc;
    trainLine.moTa = req.body.moTa;
    trainLine.trangThai = req.body.trangThai;
    var result = await trainLineService.insertTrainLine(trainLine);
    res.json({ status: true, message: "Thêm mới tuyến tàu thành công." });
});
router.put("/updatetrainline", async function (req, res) {
    var trainLineService = new TrainLineService();
    var trainLine = new TrainLine();
    trainLine._id = new ObjectId(req.query.id);
    trainLine.soTuyenTau = req.body.soTuyenTau;
    trainLine.tenTuyenTau = req.body.tenTuyenTau;
    trainLine.doDaiTuyenTau = req.body.doDaiTuyenTau;
    trainLine.thoiGianBatDau = req.body.thoiGianBatDau;
    trainLine.thoiGianKetThuc = req.body.thoiGianKetThuc;
    trainLine.giaVe = req.body.giaVe;
    trainLine.khuVuc = req.body.khuVuc;
    trainLine.moTa = req.body.moTa;
    trainLine.trangThai = req.body.trangThai;
    var result = await trainLineService.updateTrainLine(trainLine);
    res.json({ status: true, message: "Cập nhật tuyến tàu thành công." });
});
router.delete("/deletetrainline", async function (req, res) {
    var trainLineService = new TrainLineService();
    var result = await trainLineService.deleteTrainLine(req.query.id);
    res.json({ status: true, message: "Xóa tuyến tàu thành công" });
});
module.exports = router;