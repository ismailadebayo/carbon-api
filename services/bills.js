require('dotenv').config()
const axios = require('axios')


const tokenVariable = async()=> {
    const resp = await axios(
      `https://auth.reloadly.com/oauth/token`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          client_id: process.env.CLIENT_ID,
          client_secret: process.env.CLIENT_SECRET,
          grant_type: 'client_credentials',
          audience: 'https://topups-sandbox.reloadly.com'
        })
      }
    );
  
    const data = await resp.json();
    console.log(data);
    return 
  }
  
const dataToken = tokenVariable()
const result= dataToken.access_token;

const operatorDetail= async(result)=>{
const url = 'https://topups-sandbox.reloadly.com/countries/NG';
const options = {
  method: 'GET',
  headers: {
    Accept: 'application/com.reloadly.topups-v1+json',
    Authorization: `Bearer ${result}`
  }
};

axios(url, options)
	.then(res => console.log(res))
	.catch(err => console.error('error:' + err));

}


// in order : MTN=341, 9mobile=340, Airtel=342, Glo=344
const rechargeFunc = async( newAmount, phoneNumber, operatorID  )=>{
    const url = 'https://topups-sandbox.reloadly.com/topups-async';
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/com.reloadly.topups-v1+json',
        Authorization: `Bearer ${result}`
      },
      body: JSON.stringify({
        operatorId: operatorID,
        amount:  newAmount,
        useLocalAmount: true,
        recipientPhone: {countryCode: 'NG', number: phoneNumber},
        senderPhone: {countryCode: 'NG', number: '08185296264'}
      })
    };
    
    axios(url, options)
        .then(res => res.json())
        .catch(err => console.error('error:' + err));
        return
    }
    
    
// accessing utility bearer token
    
const utilityBillToken=()=>{
const url = 'https://auth.reloadly.com/oauth/token';
const options = {
  method: 'POST',
  headers: {'Content-Type': 'application/json', Accept: 'application/json'},
  body: JSON.stringify({
    client_id: CLIENT_ID,
    client_secret: CLIENT_SECRET,
    grant_type: 'client_credentials',
    audience: 'https://utilities-sandbox.reloadly.com'
  })

};

axios(url, options)
	.then(res => res.json())
	.catch(err => console.error('error:' + err));

  return

}
const utilityToken = utilityBillToken();
const utilAccessToken= utilityToken.access_token;

//BillerDetails

const billerDetails=()=>{
const url = 'https://utilities-sandbox.reloadly.com/billers'
const options = {
  method: 'GET',
  headers: {
    Accept: 'application/com.reloadly.utilities-v1+json',
    Authorization: `Bearer ${utilAccessToken}`
  }
};

axios(url, options)
	.then(res => res.json())
	.catch(err => console.error('error:' + err));
  return
}

const buyElectricity =()=>{
  const {amount, billerId, subscriber_account_number} = req.body
const url = 'https://utilities-sandbox.reloadly.com/pay';
const options = {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/com.reloadly.utilities-v1+json',
    Authorization:`Bearer ${utilAccessToken}`
  },
  body: JSON.stringify({
    subscriberAccountNumber: subscriber_account_number,
    amount: amount,
    amountId: null,
    billerId: billerId,
    useLocalAmount: null,
    additionalInfo: {invoiceId: null}
  })
};

axios(url, options)
	.then(res => res.json())
	.catch(err => console.error('error:' + err));

}
  module.exports = {
    tokenVariable,
    operatorDetail,
    rechargeFunc,
    billerDetails,
    buyElectricity
  }

