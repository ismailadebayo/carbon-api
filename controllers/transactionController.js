const transactionModel = require('../models/transactionModel')

const dailyTransaction = (req, res) =>{
    const {transactionType} = req.query
    const {user_id} = req.body
    
}
const weeklyTransaction = (req, res) =>{
    const {transactionType} = req.query
    const {user_id} = req.body
}
const monthlyTransaction = async(req, res) =>{
    const {transactionType} = req.query
    const {user_id} = req.body
  

};
const getUserTransaction = (user_id) =>{
    return transactionModel.findAll({

        where: {
            user_id : user_id
        }
    })
} 

module.exports = {dailyTransaction, weeklyTransaction, monthlyTransaction}