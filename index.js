const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');


app.use(bodyParser.json());
app.use('/posts',require('./routes/post'));

const db_connect = 'mongodb+srv://pav:Pavkata83@cluster0.4fxak.mongodb.net/resolversoft?retryWrites=true&w=majority'
mongoose.connect(db_connect,{useNewUrlParser:true,useNewUrlParser:true})
        .then(console.log('submit successful'))

app.get('/',(req,res) =>{
    res.send({Project:"Mern Crud"});
})

const PORT = process.env.PORT || 5000;
app.listen(PORT,() => console.log(`app runs on ${PORT}`));