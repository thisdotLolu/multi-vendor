const express = require("express");
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;

const authRouter = require('./routes/auth');
const userRouter = require('./routes/user');
const restaurantRouter = require('./routes/restaurant');
const categoryRouter = require('./routes/category');
const foodRouter = require('./routes/food');
const cartRouter = require('./routes/cart');
const addressRouter = require('./routes/address')
const orderRouter = require('./routes/orders')

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
app.use('/api/restaurant', restaurantRouter);
app.use('/api/category', categoryRouter);
app.use('/api/food', foodRouter);
app.use('/api/cart', cartRouter);
app.use('/api/address', addressRouter);
app.use('/api/order', orderRouter);

app.listen(process.env.PORT || PORT, ()=> console.log('listening on port', PORT))