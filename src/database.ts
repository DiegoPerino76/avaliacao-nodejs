import path from 'path';
import { Sequelize } from 'sequelize';

const database = new Sequelize({
  dialect: 'sqlite',
  storage:
    process.env.DB_PATH || path.join(__dirname, '../dados.sqlite'),
  logging: false
});

export = database;