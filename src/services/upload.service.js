const { s3Client } = require("../config/aws.config");
const fs = require("fs");

const uploadFile = async (filepath, key, filename) => {
  if (!fs.existsSync(filepath)) throw "file not found";

  const fileStream = fs.createReadStream(filepath);

  fileStream.on("error", function (err) {
    throw err;
  });

  await s3Client.putObject({
    Bucket: process.env.BUCKET_SPACE,
    ACL: "public-read",
    Body: fileStream,
    Key: `profiles/${key}`,
    ContentDisposition: `attachment; filename=${filename}`,
  });

  return `${process.env.BUCKET_URL}/profiles/${key}`;
};

module.exports = { uploadFile };
