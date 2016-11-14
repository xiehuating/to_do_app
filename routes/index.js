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

router.get('/tasks/new', function(req, res){
  res.render('tasks/new', {
    title: 'New Task'
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

router.get('/tasks/:id/edit', function(req, res){
  Task.findById(req.params.id, function (err, doc){
    res.render('tasks/edit', {
      title: 'Edit Task View',
      task: doc
    });
  });
});

router.put('/tasks/:id', function(req, res){
  Task.findById(req.params.id, function(err, doc){
    doc.task = req.body.task.task;
    doc.save(function(err){
      if (!err) {
        res.redirect('/tasks');
      } else {
        res.send('err');
      }
    });
  });
});

router.delete('/tasks/:id', function(req,res){
  Task.findById(req.params.id, function(err, doc){
    if(!doc) return next(new NotFound('Document not Found'));
    doc.remove(function(){
      res.redirect('/tasks');
    });
  });
});

module.exports = router;
