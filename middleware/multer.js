const multer = require("multer");
const path = require("path");
const storage = multer.diskStorage({
  destination: (req, file, callBack) => {
    callBack(null, "Images");
  },
  filename: (req, file, callBack) => {
    console.log(file);
    callBack(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });
module.exports = upload;
