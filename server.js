const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const bodyParser = require("body-parser");
const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/registration').then(()=>{
    console.log("Connected Successfully");
  });
}

const StudentSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    gender: String,
    dance: String,
    city: String,
    state: String,
    comments: String
});

const AboutStudent = mongoose.model('AboutStudent', StudentSchema);

const port=process.env.PORT || 8000;

app.use('/static', express.static('static'));
app.use(express.urlencoded());

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

app.get('/',(req,res)=>{
    res.status(200).render('index.pug');
})
app.get('/home',(req,res)=>{
    res.status(200).render('home.pug');
})
app.get('/register',(req,res)=>{
    res.status(200).render('register.pug');
})
app.get('/contact',(req,res)=>{
    res.status(200).render('contact.pug');
})
app.post('/register',(req,res)=>{
    const myData = new AboutStudent(req.body);
    myData.save().then(()=>{
        res.status(200).render('successfull.pug');
    }).catch(()=>{
        res.status(400).send("Server Down, Please Try Again");
    })
})
app.listen(port,()=>{
    console.log("This Page is Running on port 8000");
})