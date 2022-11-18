// create a new express routes
const express = require('express'),
    router = express.Router(),
    mainController = require('./controllers/main.controller'),
    postsController = require('./controllers/posts.controller')

// export reroutes
module.exports = router 

// define routes
// main routes
router.get('/', mainController.showHome);  

// post routes
router.get('/posts', postsController.showPosts);
router.get('/posts/:slug',postsController.showSingle);
