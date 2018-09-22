module.exports = function(app, db) {

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
    // Nothing to really do here except serve up the view
    res.render('new');
  })
};
