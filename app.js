const express = require('express');
require('./Connection/DataBase');
const app = express();
const cros = require('cors');
require("dotenv").config();
const cookiParser =require('cookie-parser')
const UserRouter =require('./Router/router')
const path =require('path')
 const staticpath2 = path.join(__dirname,'./Client/build/index.html')
 const staticpath = path.join(__dirname,'./Client/build')
  
 app.use(express.static(staticpath))
app.use(cookiParser())
app.use(express.json());
app.use(cros())
app.use(UserRouter);


app.get('*',(req,res)=>{
    res.sendFile(staticpath2)
 })
 const PORT = process.env.PORT || 4000

app.listen(PORT,()=>{
    // console.log(`Server listen in ${PORT}  port`)
});

