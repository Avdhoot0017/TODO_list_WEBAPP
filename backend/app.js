const express = require("express");
const Auth = require("./routes/Auth.js");
const list = require("./routes/list.js");
const cors = require('cors');
const bodyParser = require("body-parser");
const bcrypt = require('bcrypt');
const app = express();
require('./connection/connect.js');
app.use(bodyParser.json());
app.use(cors());


app.use("/api/v1", Auth);
app.use("/api/v2", list);


app.listen(1000 , async()=>{
     
    console.log("server started sucessfully");

})