
import React, { useState } from 'react'

const NewBlogForm = ({ createBlog }) => {

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleTitleChange = (event) => {
    setTitle(event.target.value)
  }
  const handleAuthorChange = (event) => {
    setAuthor(event.target.value)
  }
  const handleUrlChange = (event) => {
    setUrl(event.target.value)
  }

  const addBlog =  async (event) => {
    event.preventDefault()
    console.log('adding blog')

    createBlog({
      title: title,
      author: author,
      url: url,
    })

  }
  return(
    <div>
      <h1>create new blog</h1>
      <form onSubmit ={addBlog}>
        <div>
        title:
          <input
            type="text"
            value={title}
            name="Title"
            onChange={handleTitleChange}
          />
        </div>
        <div>
        author:
          <input
            type="text"
            value={author}
            name="author"
            onChange={handleAuthorChange}
          />
        </div>
        <div>
        url:
          <input
            type="text"
            value={url}
            name="url"
            onChange={handleUrlChange}
          />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}
export default NewBlogForm