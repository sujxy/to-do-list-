//date 
var today = new Date() ;

var options = {
weekday : "long" ,
day : "numeric" ,
month : "long" ,
} ;

const datestr = today.toLocaleDateString("en-US",options) ;

module.exports = {
    datestr : datestr 
}