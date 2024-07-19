const sequelize = require('sequelize')
const senha = require('./senha')


const connection = new sequelize('guiaperguntas','root',senha.module,{
    host: 'localhost',
    //port: 3306,
    dialect: 'mysql'
});

module.exports = connection