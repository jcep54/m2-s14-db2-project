const db = require('../../data/db-config');



const getAll = async () => {
  const result = await db('cars')
  return result
}

const getById = async (id) => {
  const result = await db('cars').where('id',id).first()
  return result
}

const create = async (payload) => {
  const [id] = await db('cars').insert(payload)
  const result = await getById(id)
  return result
}

module.exports = {
  getAll,
  getById,
  create
}