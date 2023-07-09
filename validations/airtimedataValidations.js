const Joi = require('joi');

const validateAirtime = (data) => {

  const airtimeSchema =   Joi.object({
        airtime_type: Joi.string ().required(),
        new_amount: Joi.ENUM.required(),
        value:[],
        airtime_phoneNumber: Joi.INTEGER().required()
   
    })

    return airtimeSchema.validate(data);
}


const validateData = (data) => {

    const dataSchema =   Joi.object({
          data_type: Joi.string().required(),
          data_amount: Joi.ENUM.required(),
          value:[],
          data_phoneNumber: Joi.INTEGER().required()
     
      })
  
      return dataSchema.validate(data);
  }

module.exports = {
    validateAirtime,
    validateData
};
