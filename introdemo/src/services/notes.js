import axios from 'axios'
//const baseUrl = 'http://localhost:3001/api/notes'
const baseUrl = '/api/notes'

const getAll = () => {
  console.log('getting all notes')
  const request = axios.get(baseUrl)
  const nonExisting = {
    id: 10000,
    content: 'This note is not saved to server',
    important: true,
  }
  return request.then(response => response.data.concat(nonExisting))
}

const create = newObject => {
  console.log('creating note', newObject)
  const request = axios.post(baseUrl, newObject)
  return request.then(response => response.data)
}

const update = (id, newObject) => {
  console.log('updating note', newObject)
  console.log('request: PUT', `${baseUrl}/${id}`)
  const request = axios.put(`${baseUrl}/${id}`, newObject)
  return request.then(response => response.data)
}


export default { getAll, create, update }