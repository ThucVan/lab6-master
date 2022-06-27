var express = require('express');
var router = express.Router();
var emulter = require('multer');
const path = require("path");

function checkFileType(file, cb){
  const fileType = /jpeg|jpg/;
  const extname = fileType.test(path.extname(file.originalname).toLowerCase());
  const mimetype = fileType.test(file.mimetype);

  if(mimetype && extname){
    return cb(null, true)
  }else {
    cb("Err : jpg only !");
  }
}

const storage = emulter.diskStorage({
  destination : './Image_upload',
  filename : function (req, file , cb){
    cb(null, file.filename + '-' + Date.now() +  path.extname(file.originalname));
  }
})

const upload = emulter({
  storage : storage,
  limits : {fileSize : 2000000},
  fileFilter : function (req, file, cb){
    checkFileType(file, cb);
  }
}).array('myImg', 5);

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/upload', function (req, res){
  upload(req, res, (err)=> {
    if(err){
      res.render('index', {msg : err, title: 'Express'})
    }else {
      res.render('index', {msg: 'File upload !', title: 'Express'})
    }
  });
})

module.exports = router;
