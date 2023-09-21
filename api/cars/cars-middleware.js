const db = require('../../data/db-config')
const vinVal = require('vin-validator')

const checkCarId = async(req, res, next) => {
  const valId = await db('cars').where('id',req.params.id).first()

  if(valId)
    next()
  else
    next({status:404, message: `car with ${req.params.id} is not found`})
}

const checkCarPayload = (req, res, next) => {
  
  for (let field in req.body){
      if(!req.body[field])
        next({status: 400, message: `${field} is missing`})
  }
  next()

}

const checkVinNumberValid = (req, res, next) => {
  const {vin} =req.body
  const isValVin = vinVal.validate(vin)
  if(isValVin)
    next()
  else
    next({status:400, message: `vin ${vin} is invalid`})
}

const checkVinNumberUnique = async (req, res, next) => {
  const {vin} =req.body
  const vinInUse = await db('cars').where('vin',vin).first()

  if(vinInUse)
    next({status:400, message: `vin ${vin} already exists`})
  else  
    next()
}


module.exports ={
  checkCarId,
  checkCarPayload,
  checkVinNumberUnique,
  checkVinNumberValid
}