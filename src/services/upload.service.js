const { s3Client } = require("../config/aws.config");
const fs = require("fs");

const uploadFile = async (filepath, key) => {
  if (!fs.existsSync(filepath)) return;

  const fileStream = fs.createReadStream(filepath);

  fileStream.on("error", function (err) {
    throw err;
  });

  await s3Client.putObject({
    Bucket: process.env.BUCKET_SPACE,
    ACL: "public-read",
    Body: fileStream,
    Key: `profiles/${key}`,
  });

  return `${BUCKET_URL}/profiles/${key}`;
};

module.exports = { uploadFile };
