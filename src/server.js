const aws = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");

const express = require("express");
var cors = require("cors");

const server = express();

server.use(cors("*"));
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

const spaceEndpoint = new aws.Endpoint(process.env.AWS_ENDPOINT);
const s3 = new aws.S3({
  endpoint: spaceEndpoint,
});

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.BUCKET_SPACE,
    acl: "public-read",
    key: (req, file, cb) => {
      console.log(file);
      cb(null, file.originalname);
    },
  }),
}).array("upload", 1);

server.post("/upload", (req, res, next) => {
  upload(req, res, (err) => {
    if (err) {
      res.send(err);
    }
    res.sendStatus(200);
  });
});

server.get("/", (req, res) => {
  res.send(
    `<h2>Shall we be interested for the CDN? What do we expect here? It's not a typical CDN server with stuff that you wish to see. But, it's written with what?</h2>`
  );
});

module.exports = server;
