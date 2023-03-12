const express = require('express')
const { body } = require('express-validator')
const router = express.Router()

const blogController = require('../controllers/blog')

// [POST] : /v1/blog/post
router.post('/post', [
    body('title').isLength({ min: 5 }).withMessage('input title minimum 5 carakter'),
    body('body').isLength({ min: 5 }).withMessage('input title minimum 5 carakter')],
    blogController.createBlogPost)

// router.get('/posts?page=1&perPage=5', blogController.getAllBlogPost)
router.get('/posts', blogController.getAllBlogPost)
router.get('/post/:postId', blogController.getBlogPostById)
router.put('/post/:postId', [
    body('title').isLength({ min: 5 }).withMessage('input title minimum 5 carakter'),
    body('body').isLength({ min: 5 }).withMessage('input title minimum 5 carakter')],
    blogController.updateBlogPost)
router.delete('/post/:postId', blogController.deleteBlogPost)

module.exports = router