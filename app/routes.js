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
// seed events
router.get('/posts/seed', postsController.seedPosts)
// all posts
router.get('/posts', postsController.showPosts)
// create posts
router.get('/posts/create', postsController.showCreate)
router.post('/posts/create', postsController.processCreate)
// edit posts
router.get('/posts/:slug/edit', postsController.showEdit)
router.post('/posts/:slug', postsController.processEdit)
// delete posts
router.get('/posts/:slug/delete', postsController.deletePost)
// single post
router.get('/posts/:slug',postsController.showSingle)
