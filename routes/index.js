var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

var Schema = mongoose.Schema;

//?
var ObjectId = Schema.objectId;

mongoose.Promise = require('bluebird');

//申明数据库模型骨架Schema，
var TaskSchema = new Schema({
  task: String
})

//申明数据库模型Model。
//感觉相当于创建了一个文档集合，第一个参数指的是数据库文档集合的名称，第二个参数是schema模板。
//使用TaskModel生成的数据都需要1以TaskSchema作为模板，并提交到Task名字的文档集合中。
var TaskModel = mongoose.model('Task', TaskSchema); 


/* GET home page. */
router.get('/', function(req, res, next) {
  res.redirect('/tasks');
});

//显示tasks页面
router.get('/tasks', function(req,res){
  TaskModel.find({}, function (err, docs){
    res.render('tasks/index', {
      title: 'Todos index view',
      docs: docs
    });
  });
});


//创建task页面
router.get('/tasks/new', function(req, res){
  res.render('tasks/new', {
    title: 'New Task'
  });
});

//post提交新创建的task
router.post('/tasks', function(req, res){
  //创建数据库实体Entity，这里创建的是一个文档实例
  var task = new TaskModel({
    task:req.body.task
  });
  task.save(function(err) {
    if (!err) {
      res.redirect('/tasks');
    } else {
      res.redireect('/tasks/new');
    }
  });
});

//更新task页面
router.get('/tasks/edit/:id', function(req, res){
  TaskModel.findById(req.params.id, function (err, doc){
    res.render('tasks/edit', {
      title: 'Edit Task View',
      task: doc
    });
  });
});

//post提交更新的task
router.post('/tasks/edit/:id', function(req, res){
  TaskModel.findById(req.params.id, function(err, doc){
    doc.task = req.body.task;
    doc.save(function(err){
      if (!err) {
        res.redirect('/tasks');
      } else {
        res.send('err');
      }
    });
  });
});

//删除task
router.post('/tasks/delete/:id', function(req,res){
  TaskModel.findById(req.params.id, function(err, doc){
    if(!doc) return next(new NotFound('Document not Found')); //?
    doc.remove(function(){
      res.redirect('/tasks');
    });
  });
});

module.exports = router;
