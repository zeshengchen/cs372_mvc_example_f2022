const Post = require('../models/post')
const { check, validationResult } = require('express-validator')

module.exports = {
    showPosts: showPosts,
    showSingle: showSingle,
    seedPosts: seedPosts,
    showCreate: showCreate,
    processCreate: processCreate,
    showEdit: showEdit,
    processEdit: processEdit
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
        // return a view with data
        res.render('pages/posts', {
            posts: posts,
            success: req.flash('success')
        })
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

        res.render('pages/single', {
            post: post,
            success: req.flash('success')
        })
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
    res.render('pages/create', {
        errors: req.flash('errors')
    })
}

/**
 * Process the creation form
 */
async function processCreate(req, res) {
    // validate information
    await check('name', 'Name is required').notEmpty().run(req)
    await check('description', 'Description is required').notEmpty().run(req)

    // if there are errors, redirect and save errors to flash
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        req.flash('errors', errors.errors.map(err => err.msg))
        return res.redirect('/posts/create')
    }

    // create a new post
    const post = new Post({
        name: req.body.name,
        description: req.body.description
    })

    // save post 
    post.save((err) => {
        if (err)
            throw err

        // set a successful flash message
        req.flash('success', 'Successfuly created post!')

        // redirect to the newly created post
        res.redirect(`/posts/${post.slug}`)
    })
}

/**
 * Show the edit form
 */
function showEdit(req, res) {
    Post.findOne({ slug: req.params.slug }, (err, post) => {
        res.render('pages/edit', {
            post: post,
            errors: req.flash('errors')
        })
    })
}

/** 
 * Process the eidt form
 */
async function processEdit(req, res) {
    // validate information
    await check('name', 'Name is required').notEmpty().run(req)
    await check('description', 'Description is required').notEmpty().run(req)

    // if there are errors, redirect and save errors to flash
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        req.flash('errors', errors.errors.map(err => err.msg))
        return res.redirect(`/posts/${req.params.slug}/edit`)
    }

    // finding a current post 
    Post.findOne({ slug: req.params.slug }, (err, post) => {
        // updating the post
        post.name = req.body.name
        post.description = req.body.description

        post.save((err) => {
            if (err)
                throw err

            // success flash message
            // redirect back to the /posts
            req.flash('success', 'Successfully updated post.')
            res.redirect('/posts')
        })
    })
}
