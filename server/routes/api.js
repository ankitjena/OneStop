const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
// const Busboy = require('busboy');
const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');
const mongoURL = "mongodb://127.0.0.1:27017/problem"
const problemModel = require('../models/problems');
const crypto = require('crypto');
const path = require('path');

const conn = mongoose.createConnection(mongoURL);
let gfs;
let file_name;
conn.once('open', () => {
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection('files');
});
var storage = new GridFsStorage({
  url: mongoURL,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
          if(err) {
            return reject(err);
          }
          const filename = buf.toString('hex') + path.extname(file.originalname);
          file_name = filename;
          const fileInfo = {
            filename: filename,
            bucketName: 'files'
          };
          resolve(fileInfo);
      });
    });
  }
});

const upload =  multer({ storage: storage });

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/', upload.single('file'), (req, res) => {
    let model = new problemModel(req.body);
    model.filename = file_name;
    model.save()
    .then((team) => {
      res.send(team)
    })
    .catch(err => {
      res.send(err)
    })
});

router.get('/problems', function(req, res, next) {
  problemModel.find({}, function(err, data){
    if(err){
      console.log(err);
    }
    else{
      res.send(data);;
    }
  })
})

router.get('/image/:filename', function(req, res, next)  {
  gfs.files.findOne({ filename: req.params.filename }, function(err, file)  {
    // Check if file
    if (!file || file.length === 0) {
      return res.status(404).json({
        err: 'No file exists'
      });
    }

    // Check if image
    if (file.contentType === 'image/jpeg' || file.contentType === 'image/png') {
      // Read output to browser
      const readstream = gfs.createReadStream(file.filename);
      return readstream.pipe(res);

    } else {
      res.status(404).json({
        err: 'Not an image'
      });
    }
  });
});

router.post('/problems/upvote/:id', (req, res, next) => {
  console.log(req.params.id);
  problemModel.findByIdAndUpdate(req.params.id, { $inc: {upvotes : 1} }, (err, problem) => {
    if(err) {
      console.log(err);
    }
    res.json({upvotes:problem.upvotes})
  })
})

router.post('/problems/upvoted/:id', (req, res, next) => {
  console.log(req.params.id);
  problemModel.findByIdAndUpdate(req.params.id, { $inc: {upvotes : -1} }, (err, problem) => {
    if(err) {
      console.log(err);
    }
    res.json({upvotes:problem.upvotes})
  })
})

router.post('/problems/downvote/:id', (req, res, next) => {
  console.log(req.params.id);
  problemModel.findByIdAndUpdate(req.params.id, { $inc: {downvotes : 1} }, (err, problem) => {
    if(err) {
      console.log(err);
    }
    res.json({downvotes:problem.downvotes})
  })
})

router.post('/problems/downvoted/:id', (req, res, next) => {
  console.log(req.params.id);
  problemModel.findByIdAndUpdate(req.params.id, { $inc: {downvotes : -1} }, (err, problem) => {
    if(err) {
      console.log(err);
    }
    res.json({downvotes:problem.downvotes})
  })
})

router.post('/problems/comment/:id', (req, res, next) => {
  console.log(req.body);
  console.log(req.params.id);
  let obj = {
    author: req.body.author,
    text: req.body.text
  }
  console.log(obj);
  problemModel.findByIdAndUpdate(req.params.id, { $push : {comments: obj}}, (err, problem) => {
    if(err) {
      console.log(err);
    }
    res.send("ok")
  })
})

router.get('/problems/:username', (req, res, next) => {
  console.log(req.params.username);
  problemModel.find({author: req.params.username}, (err, data) => {
    if(err) console.log(err);
    else {
      console.log(data);
      res.send(data);
    }
  })
})


module.exports = router;
