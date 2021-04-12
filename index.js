const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv').config()
const bodyParser = require('body-parser')
const expressLayouts = require('express-ejs-layouts')

const app = express()

//DB Connection
mongoose.connect(process.env.DB_URI, { useUnifiedTopology: true, useNewUrlParser: true }, (err)=>{
    if(err) throw err
    console.log("DB connected to MyDB")
})

//Import Routes
const authRouter = require('./routes/auth')

//Middlewares
app.set('view engine', 'ejs')
app.set('layout', 'layouts/layout')
app.use(expressLayouts)
app.use('/public',express.static('public'))
app.use(bodyParser.urlencoded({ extended: false }))

//Route middlewares
app.use('/', authRouter)


app.listen(3000, ()=> console.log("Server Started in port 3000"))