import axios from 'axios'
const baseUrl = '/api/blogs/'
let token = null
let auth = null

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}
const setToken = newToken => {
  token = `bearer ${newToken}`
  auth = {
    headers: { Authorization: token }
  }

}
const remove = async id => {
  console.log('removing id', id, 'with token:', auth)
  const response = await axios.delete(`${baseUrl}${id}`, auth)
  return response.data
}

const create = async blogObject => {
  const response = await axios.post(baseUrl, blogObject, auth)
  return response.data

}
const exportedObject = {
  getAll,
  create,
  setToken,
  remove
}
export default exportedObject