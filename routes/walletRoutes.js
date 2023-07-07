const express = require('express')
const router = express.Router()
const { startWalletFunding, completeWalletFunding, walletBalance } = require('../controllers/walletController')

//create user routes
router.post('/start', startWalletFunding)

router.post('/complete', completeWalletFunding)

router.get('/wallet_balance', walletBalance)


module.exports = router