const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/db')

const Bill = sequelize.define('bills',
    {

bill_id: {
    type: DataTypes.UUID, 
    allowNull: false,
    primaryKey: true
},
biller_id:{
    type: DataTypes.ENUM,
    values: [3, 5, 6, 9],
    allowNull: false,
},
user_id:{
    type: DataTypes.UUID,
    allowNull: false
},
bill_amount:{
    type: DataTypes.DOUBLE(10,2),
    allowNull: false,
    defaultValue: 0
},
bill_phoneNumber:{
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0
},
bill_amountId:{
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0
},
subscriber_account_number:{
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0
},
bill_date:{
    type: DataTypes.DATEONLY,
    allowNull: false,

},
wallet_balance:{
    type: DataTypes.INTEGER,
    allowNull: false,

}

    }

)


Bill.removeAttribute(['id'])

const BillHistory = sequelize.define('bills',
    {

bill_id: {
    type: DataTypes.UUID, 
    allowNull: false,
    primaryKey: true
},
user_id:{
    type: DataTypes.UUID,
    allowNull: false
},
bill_amount:{
    type: DataTypes.DOUBLE(10,2),
    allowNull: false,
    defaultValue: 0
},
bill_date:{
    type: DataTypes.DATEONLY,
    allowNull: false,

}
    }

)


BillHistory.removeAttribute(['id'])



module.exports = {
    Bill,
    BillHistory
}


