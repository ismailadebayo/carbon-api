
const {walletBalance, transaction} = require('./walletController')
const {rechargeFunc, operatorDetail} = require('../services/bills')
const { sendSms } = require('../services/sms')
const { v4: uuidv4 } = require('uuid');

const {AirtimeModel, DataModel} = require('../models/airtimedatamodel')



// Function to credit a buyer airtime
// airtime operationId for Nigerian Telecomms brands
// order : MTN=341, 9mobile=340, Airtel=342, Glo=344
const airtime =async(req, res)=>{
    const { newAmount, phoneNumber, operatorID } = req.body
    if (!newAmount || !phoneNumber || !operatorID) { 
        res.status(400).json({
            status: false,
            message: "All fields are required"
        })
        return
    }

    const checkWallet = await walletBalance.balance
    if(checkWallet < newAmount){
        res.status(400).json({
            status: false,
            message:"Insufficient balance"
        })
    }

    if(phoneNumber.length<11){
        res.status(400).json({
            status: false,
            message:"Incorrect number",
            
        })
    }
    const userID= await transaction(user_id);
    const newWalletBalance = checkWallet - newAmount;
    const airtimeId = uuidv4()
    await AirtimeModel.create({
        airtime_id: airtimeId,
        airtime_type: operatorID,
        airtime_phoneNumber: phoneNumber,
        user_id:userID,
        amount: 0,
        new_amount: newAmount,
        wallet_balance: newWalletBalance,
        airtime_date: Date.now(),
    
    })
    // in order : MTN=341, 9mobile=340, Airtel=342, Glo=344
    rechargeFunc(newAmount, phoneNumber, operatorID)
    res.status(200).json({
        status: true,
        message: "The phone number has been topped up",
    })

    sendSms(phoneNumber, `${phoneNumber} has been recharged with ${amount}`)

}

// Function to credit a buyer data
//data operatorId for Nigerian Telecomms brand network in order 
//: MTN=345, 9mobile=645, Airtel=646, Glo=931
const data =async(req, res)=>{
    const { newAmount, phoneNumber, operatorID } = req.body
    
    if (!newAmount || !phoneNumber || !operatorID) { 
        res.status(400).json({
            status: false,
            message: "All fields are required"
        })
        return
    }

    const checkWallet = await walletBalance.balance
    if(checkWallet < newAmount){
        res.status(400).json({
            status: false,
            message:"Insufficient balance"
        })
    }

    if(phoneNumber.length<11){
        res.status(400).json({
            status: false,
            message:"Incorrect number",
            
        })
    }
    const userID= await transaction(userID)
    const dataId = uuidv4()
    await DataModel.create({
        data_id: dataId,
        data_type: operatorID,
        data_phoneNumber: phoneNumber,
        user_id:userID,
        data_amount: newAmount,
        data_date: Date.now(),
    
    })
    //: MTN=345, 9mobile=645, Airtel=646, Glo=931
    rechargeFunc(newAmount, phoneNumber, operatorID)
    res.status(200).json({
        status: true,
        message: "The phone number has been topped  with data",
    })

    sendSms(phoneNumber, `${phoneNumber} has ${newAmount} worth of data`)

}

module.exports ={
    airtime,
    data

}

