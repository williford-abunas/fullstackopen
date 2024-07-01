import personsData from './data.js'

export const generateId = () => {
  const maxId =
    personsData.length > 0 ? Math.max(...personsData.map((n) => n.id)) : 0
  return maxId + 1
}
