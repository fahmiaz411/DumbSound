const multer = require("multer");

exports.uploads = (imageFile, musicFile) => {
  const filename = "";

  if (!imageFile) {
    return (req, res, next) => {
      return next();
    };
  }

  console.log(imageFile, musicFile);
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(
        null,
        `${
          musicFile
            ? "data/music"
            : imageFile == "image"
            ? "data/user"
            : "data/transact"
        }`
      );
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + "-" + file.originalname.replace(/\s/g, ""));
    },
  });

  const fileFilter = (req, file, cb) => {
    if (file.fieldname === imageFile) {
      if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
        req.fileValidationError = {
          message: "Only image files",
        };
        return cb(new Error("Only image files"), false);
      }
    }

    if (file.fieldname === musicFile) {
      if (
        !file.originalname.match(
          /\.(mp3|MP3|mp4|MP4|ogg|OGG|m4a||M4A|wav|WAV)$/
        )
      ) {
        req.fileValidationError = {
          message: "Only music files",
        };
        return cb(new Error("Only music files"), false);
      }
    }
    cb(null, true);
  };

  const sizeInMb = 30;
  const maxSize = sizeInMb * 1000 * 1000;

  const upload = multer({
    storage,
    fileFilter,
    limits: {
      fileSize: maxSize,
    },
  }).fields([
    {
      name: imageFile,
      maxCount: 1,
    },
    {
      name: musicFile,
      maxCount: 1,
    },
  ]);

  return (req, res, next) => {
    upload(req, res, (err) => {
      if (req.fileValidationError) {
        return res.status(400).send(req.fileValidationError);
      }

      if (!req.files && !err) {
        return res.status(400).send({
          message: "Please select files to upload",
        });
      }

      if (err) {
        if (err.code === "LIMIT_FILE_SIZE") {
          return res.status(400).send({
            message: `Max file sized ${sizeInMb}MB`,
          });
        }
        return res.status(400).send(err);
      }

      return next();
    });
  };
};
