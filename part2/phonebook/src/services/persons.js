import axios from 'axios'
import { handleResponse } from './utils'
const baseURL = '/api/persons'

const getAllUsers = async () => {
  return handleResponse(() => axios.get(baseURL))
}

const updateUser = async (id, newObject) => {
  return handleResponse(() => axios.put(`${baseURL}/${id}`, newObject))
}

const createUser = async (newObject) => {
  return handleResponse(() => axios.post(baseURL, newObject))
}

const deleteUser = async (id) => {
  return handleResponse(() => axios.delete(`${baseURL}/${id}`))
}

export default { getAllUsers, updateUser, createUser, deleteUser }
