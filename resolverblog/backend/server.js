const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();

require('dotenv').config();

//middleware
app.use(cors());
app.use(express.json());

//database connection
mongoose.connect(process.env.MONGO_URI,{useNewUrlParser: true, useCreateIndex:true});

const connection = mongoose.connection;
connection.once('open',() =>{
    console.log("Connected to mongo");
})

//port connection
const port = process.env.PORT || 5000;

app.listen(port,()=>{
    console.log(`app runs on ${port}`)
})
