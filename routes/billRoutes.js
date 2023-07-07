const express = require('express')
const router = express.Router()
const { utilityFunc, BillLog } = require('../controllers/billControllers')

//create airtime and data routes


router.post('/utilitybill', utilityFunc)

router.post('/billhistory', BillLog)




module.exports = router