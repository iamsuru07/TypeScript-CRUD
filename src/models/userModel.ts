import { Sequelize, DataTypes, Model, Optional } from 'sequelize';

interface UserAttributes {
  id: number;
  username: string;
  password: string;
  created_at?: Date;
  updated_at?: Date;
}

interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {}

export default function (sequelize: Sequelize) {
  class User extends Model<UserAttributes, UserCreationAttributes>
    implements UserAttributes {
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
        defaultValue: DataTypes.NOW,
      },
      updated_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      sequelize,
      tableName: 'users',
      underscored: true,
      timestamps: true,
    }
  );

  return User;
}
