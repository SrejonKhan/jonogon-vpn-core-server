const sanitizeStr = (filename) => {
  const allowedChars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789_-";

  let finalFilename = "";
  finalFilename = filename.replace(/ /g, "-").toLowerCase();

  finalFilename = finalFilename.replace(/[^a-zA-Z0-9_-]+/g, () => {
    // Generate a random allowed character
    const randomIndex = Math.floor(Math.random() * allowedChars.length);
    return allowedChars[randomIndex];
  });
  return finalFilename;
};

module.exports = { sanitizeStr };
