import { DataTypes, Model, Optional, Sequelize } from 'sequelize';
import { PostModelAttributes } from '../constants/types';

interface PostsCreationAttributes extends Optional<PostModelAttributes, 'id'> { }

export default function (sequelize: Sequelize) {
  class Post extends Model<PostModelAttributes, PostsCreationAttributes> implements PostModelAttributes {
    public id!: number;
    public user_id!: number;
    public content!: string;
    public category!: string;
    public created_at?: Date;
    public updated_at?: Date;
  }

  Post.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false
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
      tableName: 'posts_data',
      createdAt:'created_at',
      updatedAt:'updated_at',
      underscored: true,
      timestamps: true,
    }
  )
  return Post;
}