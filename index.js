//calling the express
const express = require('express');
const cookieParser = require('cookie-parser');
const expressLayouts = require('express-ejs-layouts')
const app = express();
const port = 8000;
const db = require('./config/mongoose');

app.use(express.urlencoded());

app.use(cookieParser())

app.use(express.static('./assets'));

app.use(expressLayouts);

//extract style and scripts from sub pages into the layout
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);

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