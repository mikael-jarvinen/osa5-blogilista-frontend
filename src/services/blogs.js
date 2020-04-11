import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const getOne = async id => {
  const response = await axios.get(`${baseUrl}/${id}`)
  return response.data
}

const create = async newBlog => {
  const config = {
    headers: { Authorization: token }
  }

  const response = await axios.post(baseUrl, newBlog, config)
  return response.data
}

const update = async (newBlog, id) => {
  const config = {
    headers: { Authorization: token }
  }

  const response = await axios.put(`${baseUrl}/${id}`, newBlog, config)
  return response.data
}

const commentBlog = async (id, comment) => {
  const body = { comment }
  const response = await axios.post(`${baseUrl}/${id}/comments`, body)
  return response.data
}

const remove = async id => {
  const config = {
    headers: { Authorization: token }
  }
  await axios.delete(`${baseUrl}/${id}`, config)
}

const users = async () => {
  const url = '/api/users'
  const response = await axios.get(url)
  return response.data
}

const user = async (id) => {
  const url = `/api/users/${id}`
  const response = await axios.get(url)
  return response.data
}

export default { getOne,
  getAll,
  create,
  setToken,
  update,
  remove,
  users,
  user,
  commentBlog }