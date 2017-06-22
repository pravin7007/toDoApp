# toDoApp
Todo app using mean stack.
# meantodo
mean stack Todo application
var express=require('express');
var bodyParser=require('body-parser');
var cookieParser=require('cookie-parser');
var session=require('express-session');

var mongodb=require('mongodb'),
MongoClient = mongodb.MongoClient;
var MongoStore = require('connect-mongo')(session);

var util=require('util');
var assert=require('assert');
var db;



var app;



MongoClient.connect('mongodb://localhost:27017/zzz',function(err,database){
    if(!err)
    {
		app=express();
		app.use(bodyParser.json());
		app.use(bodyParser.urlencoded({extended:true}));
		app.use(cookieParser());
        app.use(session(
            { name:'sessionCookie',secret:'secret',saveUninitialized:true,resave:true ,
            store: new MongoStore({  db:database,collection:"tttt" })
            }
            ));

        app.listen(3000);
    }

}); 
