const express = require("express") ;
const date = require('./date-utils.js') ;
const mongoose = require('mongoose') ;

const app = express() ;
mongoose.connect('mongodb://localhost:27017/todolistDB', {useNewUrlParser : true});

app.use(express.urlencoded({extended : true})) ;
app.set("view engine", "ejs");
app.use(express.static(__dirname+"/public")) ;

//load date 
const dateItem = date.datestr ;

const taskSchema = new mongoose.Schema( {
    name : String 
}) ;

const Task = mongoose.model('Task' , taskSchema) ;


app.get("/list" ,function(req,res) {

    async function loadTasks () {
        
        //returns a list of objects 
        const taskArr = await Task.find({}) ;

        if (taskArr.length === 0 ) {
            var promptText = 'add_task' ;
        }
        else {
            promptText = 'type_clear' ;
        }

        res.render("list.ejs",{ listItems : taskArr, date : dateItem , prompt : promptText}) ;
    }

    loadTasks() ;

}) ;

app.post("/list" ,function (request,response) {

    //parse req body 
    var newItem = request.body.newItem  ;
    
    async function addTask(task) {
 
        if (task === 'clear') {
            const res = await Task.deleteMany({}) ;
            console.log(res.deletedCount) ;
        } 
        else {
            //create task item 
            var newTask = new Task({
                name : task 
            }) ;
            
            //save to collection
            newTask.save() ;
            console.log(' new task added : '+ task) ;
        }
        //redirect to homepage
        response.redirect("/list") ;
    } ;

    addTask(newItem) ;


}) ;

//connect ap to server
app.listen(3000 , function() {
    console.log("connected to port 3000")
}) ;
