const Sequelize = require('sequelize')
const connection = require('./database')

const Log = connection.define("tbLog",{
    Log:{
        type: Sequelize.TEXT,
        allowNull: false

    },
    usuario:{
        type: Sequelize.STRING,
        allowNull: false
    }
})
  Log.sync({force: false}).then(()=>{
    console.log("Tabela sincronizada com sucesso")
  })

module.exports = Log