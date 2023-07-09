const Joi = require('joi');

const validateUtility = (data) => {

  const utilitySchema =   Joi.object({
        biller_type: Joi.string ().required(),
        bill_amount: Joi.integer().required(),
        subscriber_account_number: Joi.INTEGER().required()
   
    })

    return utilitySchema.validate(data);
}


const validateBillHistory = (data) => {

    const billHistorySchema =   Joi.object({
        biller_type: Joi.string().required(),
        bill_amount: Joi.integer().required(),
        bill_type: Joi.dateonly()
     
      })
  
      return billHistorySchema.validate(data);
  }

module.exports = {
    validateUtility,
    validateBillHistory
};
