const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');

//immport routes
const authRouth = require('./routes/Auth');

//db connect
dotenv.config();
mongoose.connect(process.env.DB_CONNECT_URL,{useNewUrlParser: true,useUnifiedTopology: true },()=>console.log('connect to db!'),);

//Middleware
app.use(express.json());
//routes Middlewares
app.use('/api/user/',authRouth);


app.listen(8000,()=> console.log('server running'));
