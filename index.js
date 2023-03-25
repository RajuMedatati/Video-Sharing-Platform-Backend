const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv');
const cors = require('cors')
const app = express();
const PORT = 8080;
const bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(cors())
dotenv.config();

const connect = ()=>{
    mongoose.connect(process.env.DATABASE
        ).then(()=>{
            console.log("connected to database succesfully")
        })
        .catch((err)=>{
           console.log(err.message)
        })
    }

app.listen(PORT, (err) => {
    connect();
    if (err) console.log(err);
    console.log(`App listen on ${PORT}`)
})

//medatatiraju2018 username
//bWvoyIT5Zd6WThYq password
//mongodb+srv://medatatiraju2018:<password>@cluster0.enwlgpc.mongodb.net/?retryWrites=true&w=majority