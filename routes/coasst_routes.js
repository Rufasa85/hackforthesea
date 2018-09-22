module.exports = function(app, db) {
  const cloudinary = require('cloudinary');
  const apiKeys = require('../apikeys.js');
  const multer = require('multer');
  const uploads = multer({dest:'../uploads'});

  cloudinary.config({
    cloud_name:apiKeys.cloudName,
    api_key:apiKeys.apiKey,
    api_secret:apiKeys.apiSecret
  })

  app.get('/', function (req, res) {
    data = db.collection('metadata').find({}).toArray(function(err, result){
      console.log(result);
      res.render('index');
    });
  })
  app.post('/', uploads.single('imageUpload'),
  function (req, res) {
    // cloudinary.uploader.upload(req.file.path, function (result) {
    //   console.log(result.url);
    //   res.send(result.url);
    db.collection('metadata').insert(req.body, (err, results) => {});
    res.redirect('/');
    // })
  })
  app.get('/new', function (req, res) {
    console.log(req.query.url)
    res.render('new', {imageUrl:req.query.url});
  })
  app.get('/upload', function(req,res){
    res.render('upload');
  })
  app.post('/upload',uploads.single('imageUpload'),function(req,res){
    cloudinary.uploader.upload(req.file.path,function(result){
      res.redirect(`/new?url=${result.url}`);
    })
  })
};
