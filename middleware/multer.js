const multer = require("multer");
const path = require("path");
const fs = require("fs");

const storage = multer.diskStorage({
  destination: (req, file, callBack) => {
    const dir = "images";

    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir); // create folder if not exists
    }

    callBack(null, dir);
  },
  filename: (req, file, callBack) => {
    callBack(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });
module.exports = upload;
