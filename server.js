const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const username = "kumarayush9718";
const password = "aYush8076";
const cluster = "cluster0.zmrvmku";
const dbname = "Registration";

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect(`mongodb+srv://${username}:${password}@${cluster}.mongodb.net/${dbname}?retryWrites=true&w=majority`);
  const db = mongoose.connection;
  db.on("error",console.error.bind(console,"connection error: "));
  db.once("open",function(){
    console.log("Connected successfully");
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
    try{ 
        myData.save();
        res.status(200).render('successfull.pug');
    }catch(error){
        res.status(500).send(error);
    }
})
app.listen(port,()=>{
    console.log("This Page is Running on port 8000");
})