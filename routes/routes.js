// const Router=require["express"].Router();
const express=require('express');
const Router=express.Router();
const {auth}=require('./authMiddleware.js')

//write controllers
const {signup}=require('../controllers/auth.js');
const {login}=require('../controllers/auth.js');
const {task, getAllTasks,deleteTask,updateTask,updateImportantTask,updateCompleteTask,getImpTasks,getCmpTasks,getInCmpTasks}=require('../controllers/tasks.js');
//
Router.post('/signup',signup);
Router.post('/login',login);
Router.post('/create-task',auth,task);
Router.get('/getAllTasks',auth,getAllTasks);
Router.delete('/delete-Task/:id',auth,deleteTask);
Router.put('/update-task/:id',auth,updateTask);
Router.put('/update-imp-task/:id',auth,updateImportantTask);
Router.put('/update-cmp-task/:id',auth,updateCompleteTask);
Router.get('/getImpTasks',auth,getImpTasks);
Router.get('/getCmpTasks',auth,getCmpTasks);
Router.get('/getInCmpTasks',auth,getInCmpTasks);


module.exports=Router;