import { DataTypes, Model } from 'sequelize';
import database from './database';

class Contato extends Model {
  declare id: number;
  declare nome: string;
  declare email: string;
  declare telefone: string;
}

Contato.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nome: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    email: {
      type: DataTypes.STRING(254),
      allowNull: false,
      unique: true
    },
    telefone: {
      type: DataTypes.STRING(11),
      allowNull: false
    }
  },
  {
    sequelize: database,
    tableName: 'contatos',
    timestamps: false
  }
);

export = Contato;