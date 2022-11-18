// grab our dependencies
const express = require('express'),
    expressLayouts = require('express-ejs-layouts'),
    mongoose = require('mongoose'),
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

// set the routes
app.use(require('./app/routes'))

// start our server 
app.listen(port, () => {
    console.log(`App listening on http://localhost:${port}`)
})
