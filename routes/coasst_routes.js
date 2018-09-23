module.exports = function(app, db) {
  const cloudinary = require('cloudinary');
  // const apiKeys = require('../apikeys.js');
  const multer = require('multer');
  const uploads = multer({dest:'../uploads'});
  require('dotenv').config();

  cloudinary.config({
    cloud_name:process.env.CLOUD_NAME,
    api_key:process.env.API_KEY,
    api_secret:process.env.API_SECRET
  })

  // Pull all the latest images and debris metadata to display
  app.get('/', function (req, res) {
    // Grab all of the latest images from mongodb with these skip take parameters
    skip = 0;
    limit = 100;
    db.collection('metadata').find({}).skip(skip).limit(limit).toArray(function(err, result){
      // If there was an error retrieving the data, lets send an error back
      if(err) {
        res.sendStatus(500);
      }
      else {
        // Lets build our view with the collection data
        console.log(result)
        res.render('index', {
          metadata: result
        });        
      }
    })
  })

  // Creates a new coasst debris record
  app.post('/', function (req, res) {
    // Lets take our post data and store in in mongo
    db.collection('metadata').insert(req.body, (err, results) => {
      // If there was an error, lets respond back with a 500
      if(err) {
        res.sendStatus(500);        
      }
      // If everything went accordingly, lets redirect to the index page
      else {
        res.redirect('/');
      }
    });
  })

  // HTML functionality to take the image and create debris metadata
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
