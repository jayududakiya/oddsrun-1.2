
var multer = require('multer')
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        var destination = 'images';
        if(req.FILE_DESTINATION){
            destination = req.FILE_DESTINATION;
        }
        cb(null, path.join(APP_PATH, path.join('public',destination)))
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + '.' + __.ext(file.originalname))
    }
})

IMAGE_STORAGE = module.exports = multer({ storage: storage })


UPLOAD_IMAGE_FUNC = module.exports = async (req, res) => {
    try {
      if (!req.file) throw new Error("Please select image");
      var path = "/images/" + req.file.filename;
      __.res(res, path, 200);
    } catch (error) {
      __.res(res, error.message, 500);
    }
};