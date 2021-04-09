const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv').config()
const app = express()

//DB Connection
mongoose.connect(process.env.DB_URI, { useUnifiedTopology: true, useNewUrlParser: true }, (err)=>{
    if(err) throw err
    console.log("DB connected to MyDB")
})

//Import Routes
const authRouter = require('./routes/auth')

//Middlewares
app.use(express.json())

//Route middlewares
app.use('/api/user', authRouter)


app.listen(3000, ()=> console.log("Server Started in port 3000"))