const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
require('dotenv').config();
const path = require('path');
const app = express();

app.use(express.static(path.join(__dirname,'public')));
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.set('view engine', 'ejs');

app.get('/',(req,res)=>{
    res.send('Hello');
}
)
app.listen(3000,(err)=>{
    console.log('running on port 3000');
})