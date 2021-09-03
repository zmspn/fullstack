// eslint-disable-next-line no-unused-vars
const dummy = (blogs) => {
  return 1
}
const totalLikes = (blogs) =>{
  const result = blogs.reduce((n, {likes}) => n + likes, 0)
  return result
}
const favBlog = (blogs) =>{
  const mostLiked = Math.max.apply(Math, blogs.map(function(o){return o.likes}))
  return mostLiked
}
  
module.exports = {
  dummy,
  totalLikes,
  favBlog
}