module.exports = function(app, db) {

  app.get('/', function (req, res) {
    data = db.collection('metadata').find({}).toArray(function(err, result){
      console.log(result);
      res.render('index');
    });
  })
  app.post('/', function (req, res) {
    db.collection('metadata').insert(req.body, (err, results) => {});
    res.redirect('/');
  })
  app.get('/new', function (req, res) {
    res.render('new');
  })
};
