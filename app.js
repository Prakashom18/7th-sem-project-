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

app.use(session({
    secret: 'course_secret_key',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 } // 1 hour
}));


mongoose.connect('mongodb://127.0.0.1:27017/recommendDB')
    .then(()=> console.log('mongodb connected'))
    .catch(err=>console.log(err))

// app.use('/',)

// app.get('/',(req,res)=>{
//     res.send('Hello');
// })

app.use('/',require('./routes/auth'));
app.use('/courses',require('./routes/courses'));
app.use('/recommend',require('./routes/recommend'));




app.listen(3000,(err)=>{
    console.log('running on port 3000');
})