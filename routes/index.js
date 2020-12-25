const { startapp,appdata} = require('../controllers')

const router =require('express').Router()

router.post('/data',startapp)
router.get('/data',appdata)
module.exports=router