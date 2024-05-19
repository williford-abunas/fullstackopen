import axios from 'axios'
const baseURL = 'http://localhost:3001/persons'

const getAllUsers = async () => {
  try {
    const response = await axios.get(baseURL)
    console.log('Successfully get users', response.data)
    return response.data
  } catch (error) {
    console.error('Error getting all users', error)
  }
}

const updateUser = async (id, newObject) => {
  try {
    const response = await axios.put(`${baseURL}/${id}`, newObject)
    console.log('User updated successfully', response.data)

    return response.data
  } catch (error) {
    console.error('Error updating user', error)
  }
}

const createUser = async (newObject) => {
  try {
    const response = await axios.post(baseURL, newObject)
    console.log('User successfully created!', response.data)
    return response.data
  } catch (error) {
    console.error('Error adding user', error)
  }
}

const deleteUser = async (id) => {
  try {
    const response = await axios.delete(`${baseURL}/${id}`)
    console.log('Successfully deleted user', response.data)
    return response.data
  } catch (error) {
    console.error('Error deleting user', error)
  }
}

export default { getAllUsers, updateUser, createUser, deleteUser }
