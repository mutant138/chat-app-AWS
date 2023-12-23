const  Sequelize = require('sequelize')

const sequelize = require('../util/database')

const Chat = sequelize.define('chat',{
    id:{
        type: Sequelize.INTEGER,
        autoIncrement:true,
        allowNull: false,
        primaryKey: true
      },
    chatMessage:{
        type:Sequelize.STRING,
        allowNull:false
      },
      userId : {
        type: Sequelize.INTEGER, // Adjust the data type as needed
        allowNull: false,
      }
})

module.exports = Chat