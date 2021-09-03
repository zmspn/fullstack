import React, { useState } from 'react'
import PropTypes   from 'prop-types'

const Blog = (props) => {
  const blog = props.blog
  const [largeBlog, setLargeBlog] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }


  const viewBlog = () => {
    setLargeBlog(!largeBlog)
  }
  const removeBlog = () => props.removeBlog(blog)


  return (
    <div style={blogStyle}><div>
      {largeBlog?
        <div>
          <p>{blog.title}</p>
          <p>{blog.author}</p>
          <p>{blog.url}</p>
          <p><button onClick={removeBlog}>remove blog</button></p>
          <p><button  onClick={viewBlog}>less</button> </p>
        </div>:
        <div>
          <p>{blog.title}</p>
          <p><button  onClick={viewBlog}>more</button> </p>
        </div>
      }
    </div>
    </div>
  )}

Blog.propTypes  = {
  blog: PropTypes.object.isRequired,
  removeBlog: PropTypes.func.isRequired
}

export default Blog