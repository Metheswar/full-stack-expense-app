// config.js
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('metheswar', 'root', 'Methi@2304', {
  host: 'localhost',
  dialect: 'mysql',
});

module.exports = sequelize;
