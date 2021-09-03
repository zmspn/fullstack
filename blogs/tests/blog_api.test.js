/* eslint-disable indent */
const { expect, test } = require('@jest/globals')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const helper = require('./test_helper')
const api = supertest(app)

test('notes are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('there are two blog posts', async () => {
  const response = await api.get('/api/blogs')

  console.log(response.body[0].id)
  expect(response.body).toHaveLength(2)
})

test('checking for id', async () =>{
   const allblogs = await Blog.find({})
   expect(allblogs[0].id).toBeDefined
})

test('testing for posting', async () => {

  const newBlog = {
    title:'Canonical string reduction',
    author:'Edsger W. Dijkstra',
    url:'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes:12
  }

    await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(200)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

})

afterAll(() => {
  mongoose.connection.close()
})