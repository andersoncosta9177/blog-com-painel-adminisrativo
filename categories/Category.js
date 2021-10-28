const Sequelize = require('sequelize')
const connection = require('../database/database')


const Category = connection.define('categories', {
    title:{
        type: Sequelize.STRING,
        aloowNull: false
    },slug:{
        type:Sequelize.STRING,
        aloowNull: false
    }
})


module.exports = Category


