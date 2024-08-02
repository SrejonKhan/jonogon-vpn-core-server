const AWS = require("@aws-sdk/client-s3");

const s3Client = new AWS.S3({
  forcePathStyle: false,
  endpoint: process.env.AWS_ENDPOINT,
  region: "sgp1",
  credentials: {
    accessKeyId: process.env.SPACES_KEY,
    secretAccessKey: process.env.SPACES_SECRET,
  },
});

module.exports = { s3Client };
