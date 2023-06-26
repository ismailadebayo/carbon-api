const express = require('express')
const router = express.Router()
const { startWalletFunding, completeWalletFunding } = require('../controllers/walletController')

//create user routes
router.post('/start', startWalletFunding)

router.post('/complete', completeWalletFunding)


module.exports = router