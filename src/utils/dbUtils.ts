import { Sequelize } from 'sequelize';
import * as dotenv from 'dotenv';
import UserModel from '../models/userModel';
import PostModel from '../models/postModel'

dotenv.config();

const DB_NAME: string = process.env.DB_NAME!;
const DB_USER: string = process.env.DB_USER!;
const DB_PASS: string = process.env.DB_PASS!;
const DB_HOST: string = process.env.DB_HOST!;
const DB_PORT: number = Number(process.env.DB_PORT);

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
    host: DB_HOST,
    port: DB_PORT,
    dialect: 'mysql',
    logging: true,
});

const User = UserModel(sequelize);
const Post = PostModel(sequelize);

const syncDatabase = async () => {
    try {
        await sequelize.sync();
        console.log('Database and tables have been created or updated.');
    } catch (error) {
        console.error('Error syncing database:', error);
    }
};

export const connectToDatabase = async () => {
    try {
        await sequelize.authenticate();
        console.log('Database connection has been established successfully.');
        await syncDatabase();
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
};

export { sequelize, User, Post };
