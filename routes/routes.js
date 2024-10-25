// const Router=require["express"].Router();
const express=require('express');
const Router=express.Router();
const {auth}=require('./authMiddleware.js')

//write controllers
const {signup}=require('../controllers/auth.js');
const {login}=require('../controllers/auth.js');
const {task, getAllTasks}=require('../controllers/tasks.js');
//
Router.post('/signup',signup);
Router.post('/login',login);
Router.post('/create-task',auth,task);
Router.post('/getAllTasks',auth,getAllTasks);

module.exports=Router;