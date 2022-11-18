// grab our dependencies
const express = require('express'),
    expressLayouts = require('express-ejs-layouts'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
    session = require('express-session'),
    cookieParser = require('cookie-parser'),
    flash = require('connect-flash'),
    app = express(),
    port = process.env.PORT || 8080

require('dotenv').config()

// configure our application

// tell express where to look for static assets
app.use(express.static(__dirname + '/public'))

// set ejs as our templating engine 
app.set('view engine', 'ejs')
app.use(expressLayouts)

// connect to our database
mongoose.connect(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })

// use body parser to grab info from a form
app.use(bodyParser.urlencoded({ extended: true }))

// set sessions and cookie parser
app.use(cookieParser())
app.use(session({
    secret: process.env.SECRET,
    cookie: { maxAge: 60000 },
    resave: false, // forces the session to be saved back to the store
    saveUninitialized: false // dont save unmodified
}))
app.use(flash())

// set the routes
app.use(require('./app/routes'))

// start our server 
app.listen(port, () => {
    console.log(`App listening on http://localhost:${port}`)
})
