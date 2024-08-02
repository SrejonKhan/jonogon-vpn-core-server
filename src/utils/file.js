const crypto = require("crypto");

const sanitizeOrGenerateStr = (filename) => {
  const allowedChars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789_-";
  const maxLength = 100;
  const minLength = 3;

  const finalFilename = "";

  filename = filename.replace(/ /g, "_");

  if (typeof filename !== "string" || filename.length < minLength || filename.length > maxLength) {
    finalFilename += crypto.randomBytes(2).toString("hex");
  }

  for (const char of filename) {
    if (!allowedChars.includes(char)) {
      finalFilename += crypto.randomBytes(2).toString("hex");
    }
  }

  return finalFilename;
};

module.exports = { sanitizeOrGenerateStr };
