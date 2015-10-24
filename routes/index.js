		var express = require('express');
		var router = express.Router();
		var Todo  = require('../models/Todo');

		/* GET home page. */
		router.get('/', function(req, res, next) {
			res.sendfile('./public/index.html');
		});


		router.get('/todos', function(req, res) {

				// use mongoose to get all todos in the database
				Todo.find({archive:false},function(err, todos) {

					// if there is an error retrieving, send the error. nothing after res.send(err) will execute
					if (err)
						res.send(err)
					console.log(todos.length);
					res.json(todos); // return all todos in JSON format
				});
		});

			// create todo and send back all todos after creation
			router.post('/todos', function(req, res) {

				// create a todo, information comes from AJAX request from Angular
				Todo.create({
					text : req.body.text,
					done : false,
					archive : false
				}, function(err, todo) {
					if (err)
						res.send(err);

					// get and return all the todos after you create another
					Todo.find({archive:false},function(err, todos) {
						if (err)
							res.send(err)
						res.json(todos);
					});
				});

			});

			// delete a todo
			router.delete('/todos/:todo_id', function(req, res) {				
				Todo.remove({
					_id : req.params.todo_id
				}, function(err, todo) {
					if (err)
						res.send(err);

					// get and return all the todos after you create another
					Todo.find({archive:false},function(err, todos) {
						if (err)
							res.send(err)
						res.json(todos);
					});
				});
			});

			router.put('/todos/:todo', function(req, res) {
				var todo = JSON.parse(req.params.todo);
				var todoId = todo._id;
				var doneChanged = todo.done;								
				Todo.update(
				{
					_id : todoId
				},
				{
					$set: { done: doneChanged }
				}, function(err, todo) {
					if (err)
						res.send(err);
				});
			});

			router.put('/archTodos/:todo_id', function(req, res) {																
				Todo.update(
				{
					_id : req.params.todo_id
				},
				{
					$set: { archive: true }
				}, function(err, todo) {
					if (err)
						res.send(err);
					Todo.find({archive:false},function(err, todos) {
						if (err)
							res.send(err)
						res.json(todos);
					});
				});
			});


			module.exports = router;
