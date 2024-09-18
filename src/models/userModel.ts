import { Sequelize, DataTypes, Model, Optional } from 'sequelize';
import { UserModelAttributes } from '../constants/types';


interface UserCreationAttributes extends Optional<UserModelAttributes, 'id'> { }

export default function (sequelize: Sequelize) {
  class User extends Model<UserModelAttributes, UserCreationAttributes>
    implements UserModelAttributes {
    public id!: number;
    public username!: string;
    public password!: string;
    public created_at!: Date;
    public updated_at!: Date;
  }

  User.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize.fn('now'),
      },
      updated_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize.fn('now'),
      },
    },
    {
      sequelize,
      tableName: 'users',
      underscored: true,
      timestamps: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  );

  return User;
}
