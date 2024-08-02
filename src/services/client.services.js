const { s3Client } = require("../config/aws.config");

const handleFileSend = async (body, key) => {
  const res = await s3Client.putObject({
    Bucket: process.env.BUCKET_SPACE,
    ACL: "public-read",
    Body: body,
    Key: key,
  });
};

module.exports = { handleFileSend };
