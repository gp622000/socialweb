//calling the express
const express = require('express');
const app = express();
const port = 8000;

//use express router
app.use('/',require('./routes/index'));

app.set('view engine','ejs');
app.set('views','./views');

// `` is called backtic
// this process is known as interpolation.
app.listen(port,function(err){
    if(err){
        console.log(`Error in running the server: ${err}`);
    }
    //console.log("Server is running at port: ",port) same as below;
    console.log(`Server is running on port: ${port}`);
});