const express = require("express") ;

const app = express() ;

app.use(express.urlencoded({extended : true})) ;
app.set("view engine", "ejs");
app.use(express.static(__dirname+"/public")) ;

let tasks = [] ;



app.get("/list" ,function(req,res) {

    //date 
    var today = new Date() ;

    var options = {
    weekday : "long" ,
    day : "numeric" ,
    month : "long" ,
    } ;

    var datestr = today.toLocaleDateString("en-US",options) ;

    //prompt text
    if (tasks.length === 0 ) {
         var promptText = "add_item " ;
    }
    else {
        promptText = "type_clear "
    }

    
    res.render("list.ejs",{ listItems : tasks, date : datestr , prompt : promptText}) ;
}) ;

app.post("/list" ,function (request,response) {
    var newItem = request.body.newItem  ;
    if (newItem === "clear") {
        tasks = [] ; 
    }
    else {
        tasks.push(newItem) ;
    }

    response.redirect("/list") ;
}) ;

app.listen(3000 , function() {
    console.log("connected to port 3000")
}) ;
