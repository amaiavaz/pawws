const multer = require('multer');

const uploadImage = (folder) =>{

  const storage = multer.diskStorage({
    destination: `public/images/${folder}`,
    filename: function(req, file, cb) {
      let originalName = file.originalname;
      let finalName = Date.now() + "-" + originalName;
      cb(null, finalName)
    }
  });

  const upload = multer({ storage: storage }).single("img"); //esto es el name del input
  return upload;
}

module.exports = uploadImage;