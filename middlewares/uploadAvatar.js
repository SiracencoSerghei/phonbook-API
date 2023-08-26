const multer = require("multer");
const path = require("path");

const tempDir = path.join(__dirname, "..", "tmp");

const multerConfig = multer.diskStorage({
  destination: tempDir,
});

const uploadAvatar = multer({
  storage: multerConfig,
});

module.exports = uploadAvatar;
