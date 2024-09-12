import { DataTypes, Model, Optional, Sequelize } from 'sequelize';

interface PostsAttributes {
  id: number;
  user_id: number
  content: string;
  category: string;
  created_at?: Date;
  updated_at?: Date;
}

interface PostsCreationAttributes extends Optional<PostsAttributes, 'id'> { }

export default function (sequelize: Sequelize) {
  class Post extends Model<PostsAttributes, PostsCreationAttributes> implements PostsAttributes {
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