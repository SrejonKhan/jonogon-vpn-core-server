const express = require("express");
var cors = require("cors");

const server = express();

server.use(cors("*"));
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

const AWS = require("@aws-sdk/client-s3");
const s3 = new AWS.S3({
  forcePathStyle: false,
  endpoint: process.env.AWS_ENDPOINT,
  region: "sgp1",
  credentials: {
    accessKeyId: process.env.SPACES_KEY,
    secretAccessKey: process.env.SPACES_SECRET,
  },
});

const s3Client = async () => {
  const res = await s3.putObject({
    Body: "This is a vpn file",
    Bucket: process.env.BUCKET_SPACE,
    Key: `test.txt`,
    ACL: "public-read",
  });
};

server.get("/", (req, res) => {
  res.send(
    `<h2>Shall we be interested for the CDN? What do we expect here? It's not a typical CDN server with stuff that you wish to see. But, it's written with what?</h2>`
  );
});
s3Client();

module.exports = server;
