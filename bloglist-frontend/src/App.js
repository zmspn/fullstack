import React, { useState, useEffect, useRef } from 'react'

import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/notif'
import NewBlogForm from './components/NewBlogForm'
import Togglable from './components/Togglable'
const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [notifMsg, setNotifMsg] = useState(null)

  const blgFormref = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  useEffect(() => {
    const loggedUsrJSON = window.localStorage.getItem('loggedBlogappusr')
    if (loggedUsrJSON){
      const user = JSON.parse(loggedUsrJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])
  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('loggin in with: ', username, password)
    try{
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedBlogappusr', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setNotifMsg('wrong username or pass')
      setTimeout(() => {
        setNotifMsg(null)
      }, 5000)
    }
  }

  const userLogOut = async (event) => {
    console.log('loggin out')
    event.preventDefault()
    window.localStorage.clear()
    setUser(null)
  }

  const loginForm = () => (
    <div>
      <h2>Log in to application</h2>
      <form onSubmit={handleLogin}>
        <div>
        username
          <input
            type="text"
            value={username}
            name="Username "
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
        password
          <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )

  const handleAddBlog = (blogObject) => {
    blgFormref.current.toggleVisibility()
    blogService
      .create(blogObject)
      .then(returned => {
        setBlogs(blogs.concat(returned))
      })

  }
  const removeBlog = async (DeleteBlog) => {
    if(window.confirm('remove blog?')){
      try {
        blogService
          .remove(DeleteBlog.id)
        setBlogs(blogs.filter(blog => blog.id !== DeleteBlog.id))
        setNotifMsg('blog deleted')
        setTimeout(() => {
          setNotifMsg(null)
        }, 5000)
      } catch(exception) {
        setNotifMsg('error')
        console.log(exception)
      }
    }


  }

  const newBlogForm = () => (
    <Togglable buttonLabel="create new blog" ref={blgFormref}>
      <NewBlogForm createBlog={handleAddBlog}>
      </NewBlogForm>
    </Togglable>
  )

  const showAllBlogs = () => (

    <div>
      <Notification notificationMessage = {notifMsg}/>
      <h2>blogs</h2>
      <p>{user.name} logged in  <button onClick={userLogOut}>logout</button> </p>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} removeBlog={removeBlog} />
      )}
      {newBlogForm()}
    </div>
  )

  return (
    <div>
      <Notification notifMessage ={notifMsg}/>
      {user === null ?
        loginForm() :
        showAllBlogs()
      }
    </div>
  )
}

export default App