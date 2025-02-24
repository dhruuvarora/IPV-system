// middleware/multerConfig.js

const multer = require("multer");

const storage = multer.memoryStorage(); // Store images in memory before saving to DB
const upload = multer({ storage: storage });

module.exports = upload;
