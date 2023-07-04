const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/db')

const bank = sequelize.define('bank', {

    bank_id:{
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true
    },
    wallet_id:{
        type: DataTypes.UUID,
        allowNull: false
    },
    user_id:{
        type: DataTypes.UUID,
        allowNull: false,
    },
    
    account_amount:{
        type: DataTypes.DOUBLE(10,2),
        allowNull: false,
        defaultValue: 0
    }
})
Wallet.removeAttribute(['id'])
module.exports = bank