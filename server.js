const express = require("express");
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;

const authRouter = require('./routes/auth');
const userRouter = require('./routes/user');

dotenv.config()

const admin = require('firebase-admin');
const serviceAccount = require('./servicesAccountKey.json');

admin.initializeApp({credential: admin.credential.cert(serviceAccount)})

mongoose.connect(process.env.MONGO_URL).then(()=>console.log("Db connected")).catch((err)=>{
    console.log(err);
})

app.get('/', (req, res)=>{
    res.send("Hello")
})


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use('/',authRouter);
app.use('/api/users', userRouter);
app.listen(process.env.PORT || PORT, ()=> console.log('listening on port', PORT))