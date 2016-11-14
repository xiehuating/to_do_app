var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var ObjectId = Schema.objectId;

var Task = new Schema({
  task: String
})

var Task = mongoose.model('Task', Task);

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/tasks', function(req,res){
  Task.find({}, function (err, docs){
    res.render('tasks/index', {
      title: 'Todos index view',
      docs: docs
    });
  });
});

router.post('/tasks', function(req, res){
  var task = new Task(req.body.task);
  task.save(function(err) {
    if (!err) {
      res.redirect('/tasks');
    } else {
      res.redireect('/tasks/new');
    }
  });
});



router.get('/tasks/new', function(req, res){
  res.render('tasks/new', {
    title: 'New Task'
  });
});

module.exports = router;
