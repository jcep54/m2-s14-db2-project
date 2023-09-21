const express = require('express');
const router = express.Router();
const Cars = require('./cars-model')

const { checkCarId, checkCarPayload, checkVinNumberUnique, checkVinNumberValid} = require('./cars-middleware')


router.get('/', async (req, res, next) =>{
    try{
        const carList = await Cars.getAll()
        res.json(carList)
    }catch(err){
        next(err)
    }
})

router.get('/:id', checkCarId, async (req, res, next) =>{
    try{
        const carById = await Cars.getById(req.params.id)
        res.json(carById)
    }catch(err){
        next(err)
    }
})

router.post('/',[checkVinNumberUnique, checkVinNumberValid,checkCarPayload], async (req, res, next)=>{
    try{
        const newCar = await Cars.create(req.body)
        res.status(201).json(newCar)
    }catch(err){
        next(err)
    }
})


router.use((err, req, res, next) =>{
    res.status(err.status || 500).json({
        message: err.message
    })
})

module.exports = router;
