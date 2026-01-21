const sequelize = require('../config/mysqldb');
const { DataTypes } = require('sequelize');

const User = sequelize.define('User',{
    Id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },

  Name: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
    validate: {
      isEmail: true,
    },
  },
    password: {          
    type: DataTypes.STRING,
    allowNull: false,
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false,
  },
},
    {
    tableName: 'users',
    timestamps: true    
    });

module.exports = User;