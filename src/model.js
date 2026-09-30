const { DataTypes } = require('sequelize');
const database = require('./database');
module.exports = database.define('Contato', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  nome: { type: DataTypes.STRING(100), allowNull: false },
  email: { type: DataTypes.STRING(254), allowNull: false, unique: true },
  telefone: { type: DataTypes.STRING(11), allowNull: false }
}, { tableName: 'contatos', timestamps: false });
