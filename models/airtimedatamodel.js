const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/db')

const Airtime = sequelize.define('airtimes',
    {

airtime_id: {
    type: DataTypes.UUID, 
    allowNull: false,
    primaryKey: true
},
airtime_type:{
    type: DataTypes.ENUM,
    values: [341, 340, 342, 344],
    allowNull: false,
},
airtime_phoneNumber:{
    type: DataTypes.INTEGER,
    allowNull: false
},
user_id:{
    type: DataTypes.UUID,
    allowNull: false
},
amount:{
    type: DataTypes.DOUBLE(10,2),
    allowNull: false,
    defaultValue: 0
},
new_amount:{
    type: DataTypes.DOUBLE(10,2),
    allowNull: false,
    
},
airtime_date:{
    type: DataTypes.DATEONLY,
    allowNull: false,

},
wallet_balance:{
    type: DataTypes.INTEGER,
    allowNull: false,

}

    }

)


Airtime.removeAttribute(['id'])


const Data = sequelize.define('datas',
    {

data_id: {
    type: DataTypes.UUID, 
    allowNull: false,
    primaryKey: true
},
data_type:{
    type: DataTypes.ENUM,
    values: [341, 340, 342, 344],
    allowNull: false,
},
data_phoneNumber:{
    type: DataTypes.INTEGER,
    allowNull: false
},
user_id:{
    type: DataTypes.UUID,
    allowNull: false
},
data_amount:{
    type: DataTypes.DOUBLE(10,2),
    allowNull: false,
    defaultValue: 0
},
data_date:{
    type: DataTypes.DATEONLY,
    allowNull: false,

},
wallet_balance:{
    type: DataTypes.INTEGER,
    allowNull: false,

}

    }

)


Data.removeAttribute(['id'])



module.exports = {
    Airtime,
    Data
}


