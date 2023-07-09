
const {walletBalance, transaction} = require('./walletController')
const {rechargeFunc, operatorDetail} = require('../services/bills')
const { sendSms } = require('../services/sms')
const { v4: uuidv4 } = require('uuid');
const { phoneValidation } = require('../utils/helpers')
const {AirtimeModel, DataModel} = require('../models/airtimedatamodel')
const {validateAirtime, validateData}= require('../validations/airtimedataValidations')


// Function to credit a buyer airtime
// airtime operationId for Nigerian Telecomms brands
// order : MTN=341, 9mobile=340, Airtel=342, Glo=344
const airtime = async (req, res) => {

    const { error } = validateAirtime(req.body)
    if (error !== undefined) {
        res.status(400).json({
            status: true,
            message: error.details[0].message || "Bad request"
        })
        return
    }
    try {
    let { newAmount, phoneNumber, operatorName } = req.body
        const { user_id } = req.params
         phoneNumber = phoneValidation(phoneNumber)  
    if (phoneNumber === false) throw new Error('Invalid phone number', 400)

    if (!user_id || !newAmount  || !operatorName) { 
       throw new Error('All fields are required', 400)
    
    }

    const checkWallet = await walletBalance.balance
    if (checkWallet < newAmount)throw new Error('Insufficient Funds', 400)
    const userID= await transaction(user_id);
    const newWalletBalance = checkWallet - newAmount;
    const airtimeId = uuidv4()
    await AirtimeModel.create({
        airtime_id: airtimeId,
        airtime_type: operatorName,
        airtime_phoneNumber: phoneNumber,
        user_id:userID,
        amount: 0,
        new_amount: newAmount,
        wallet_balance: newWalletBalance,
        airtime_date: Date.now(),
    
    })
    // in order : MTN=341, 9mobile=340, Airtel=342, Glo=344
    rechargeFunc(newAmount, phoneNumber, operatorName)
    res.status(200).json({
        status: true,
        message: "Recharge card successfully topped",
    })

    sendSms(phoneNumber, `${phoneNumber} has been recharged with ${amount}`)

    }catch(err){
        res.status(500).json({
            status: false,
            message: err.message
        })
    }
    
}

// Function to credit a buyer data
//data operatorId for Nigerian Telecomms brand network in order 
//: MTN=345, 9mobile=645, Airtel=646, Glo=931
const data =async(req, res)=>{

    const { error } = validateData(req.body)
    if (error !== undefined) {
        res.status(400).json({
            status: true,
            message: error.details[0].message || "Bad request"
        })
        return
    }
    try {
        let { newAmount, phoneNumber, operatorName } = req.body
            const { user_id } = req.params
             phoneNumber = phoneValidation(phoneNumber)  
        if (phoneNumber === false) throw new Error('Invalid phone number', 400)
    
        if (!user_id || !newAmount  || !operatorName) { 
           throw new Error('All fields are required', 400)
        
        }
    
        const checkWallet = await walletBalance.balance
        if (checkWallet < newAmount)throw new Error('Insufficient Funds', 400)
        const userID= await transaction(user_id);
        const newWalletBalance = checkWallet - newAmount;
        const dataId = uuidv4()
    
    await DataModel.create({
        data_id: dataId,
        data_type: operatorName,
        data_phoneNumber: phoneNumber,
        user_id:userID,
        newWalletBalance,
        data_amount: newAmount,
        data_date: Date.now(),
    
    })

    //success message
    res.status(200).json({
        status: true,
        message: "The phone number has been topped  with data",
    })

    sendSms(phoneNumber, `${phoneNumber} has ${newAmount} worth of data`)

    }catch(err){
        res.status(500).json({
            status: false,
            message: err.message
        })
    }
    
}


module.exports ={
    airtime,
    data

}

