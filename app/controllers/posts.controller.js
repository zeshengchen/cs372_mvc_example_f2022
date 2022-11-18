const Post = require('../models/post')

module.exports = {
    showPosts: showPosts,
    showSingle: showSingle,
    seedPosts: seedPosts,
    showCreate: showCreate,
    processCreate: processCreate
}

/** 
 * show all posts
 */
function showPosts(req, res) {
    // get all posts
    Post.find({}, (err, posts) => {
        if (err) {
            res.status(404)
            res.send('Posts not found')
        }

        // return a view with data
        res.render('pages/posts', { posts: posts })
    })
}

/**
 * show a single post
 */
function showSingle(req, res) {
    // get a single post 
    Post.findOne({ slug: req.params.slug }, (err, post) => {
        if (err) {
            res.status(404)
            res.send('Post not found!')
        }
        res.render('pages/single', { post: post })
    })
}

/**
 * seed our database
 */
function seedPosts(req, res) {
    // create some posts 
    const posts = [
        { name: 'Homework', description: 'Homework is challenging!' },
        { name: 'Lecture', description: 'Lecture is fun!' },
        { name: 'Project', description: 'Course Project is great!' }
    ]

    // use the Post model to insert/save
    Post.deleteMany({}, () => {
        for (let post of posts) {
            let newPost = new Post(post)
            newPost.save()
        }
    })

    // seeded!
    res.send('Database seeded!')
}

/**
 * Show the create form
 */
function showCreate(req, res) {
    res.render('pages/create')
}

/**
 * Process the creation form
 */
function processCreate(req, res) {
    // create a new post
    const post = new Post({
        name: req.body.name,
        description: req.body.description
    })

    // save post 
    post.save((err) => {
        if (err)
            throw err

        // redirect to the newly created post
        res.redirect(`/posts/${post.slug}`)
    })
}
