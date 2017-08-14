const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');

var db = require("./config/mongodb");
require("./models/location");
app.use(fileUpload());
app.use(bodyParser());
app.use('/public', express.static('./public'));
app.engine('html', require('ejs').renderFile);
app.set('views', "./public/");
require("./routes")(app, db);




app.listen(8081);


// 18:45