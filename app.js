var express = require("express");
const cors = require('cors');
app = express(),
  PORT = process.env.PORT || 8080,
  mongoose = require("mongoose"),
  User = require("./apps/model/user"),
  bodyParser = require("body-parser"),
  jsonwebtoken = require("jsonwebtoken");

var userHandlers = require('./apps/controllers/api/authController');

app.listen(PORT, () => {
  console.log(`Máy chủ đang chạy trên cổng ${PORT}`);
});

mongoose.connect("mongodb+srv://Gjngx:sa@cluster0.j4omnsi.mongodb.net/db_metromap")
.then((result) => console.log('connected to db'))
.catch((err) => console.log(err));

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.json()); 
app.use(cors());

var controller = require(__dirname  + "/apps/controllers");
app.use(controller);

app.route('/auth/register')
  .post(userHandlers.register);

app.route('/auth/sign_in')
  .post(userHandlers.sign_in);

app.use(function (req, res, next) {
  if (
    req.headers &&
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "JWT"
  ) {
    jsonwebtoken.verify(
      req.headers.authorization.split(" ")[1],
      "RESTFULAPIs",
      function (err, decode) {
        if (err) req.user = undefined;
        req.user = decode;
        next();
      }
    );
  } else {
    req.user = undefined;
    next();
  }
});