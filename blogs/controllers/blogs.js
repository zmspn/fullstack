/* eslint-disable indent */
const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/User')
const jwt = require('jsonwebtoken')
const { tokenExtractor } = require('../utils/middleware')

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1,})
  response.json(blogs.map(b => b.toJSON()))
})



blogRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
    response.json(blogs.map(blog => blog.toJSON()))
  })

  // POST BLOG WITH TOKEN
blogRouter.post('/', tokenExtractor, async (request, response) => {
  try {
    const body = request.body
    const token = request.token
    const decodedToken = jwt.verify(token, process.env.SECRET) 
    const user = await User.findById(decodedToken.id)
    console.log('idd ' + decodedToken.id)
    if (!body.likes) {
        body.likes = 0
    }
  
    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes,
        user: user._id
    })
  
      const savedBlog = await blog.save()
      user.blogs = user.blogs.concat(savedBlog._id)
      await user.save()
      response.json(savedBlog.toJSON())
  } catch(exception) {
    console.log(exception)
    if(exception.status == 401) {
      return response.status(401).json({ error: exception})
    } else if (exception.status == 506){
      return response.status(506).json({ error: ' '+ exception })
    }
    else return exception
  }
})

// DELETE BLOG
blogRouter.delete('/:id', async (request, response, next) => {

  const token = request.headers.authorization.split(' ')[1]
  console.log("token: ", token)
  const decodedToken = jwt.verify(token, process.env.SECRET)

  const user = await User.findById(decodedToken.id)
  const deleteBlog = await Blog.findById(request.params.id)



  if ( deleteBlog.user._id.toString() === user._id.toString() ) {
      try {
          await Blog.findByIdAndRemove(request.params.id)
          response.status(204).end()
        } catch (exception) {
          next(exception)
        }
  } else {
      return response.status(401).json({ error: 'Unauthorized' })
  }
})

module.exports = blogRouter