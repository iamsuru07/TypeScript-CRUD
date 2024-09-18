import { Sequelize } from 'sequelize';
import * as dotenv from 'dotenv';
import UserModel from '../models/userModel';
import PostModel from '../models/postModel'
import { dbConfig } from '../config/config';
import { NodeEnvEnums } from '../constants/nodeEnvEnums';

dotenv.config();

const NODE_ENV: string = String(process.env.NODE_ENV);

let setConfigEnv = dbConfig.development

if (NODE_ENV === NodeEnvEnums.PRODUCTION) {
    setConfigEnv = dbConfig.production
} else if (NODE_ENV === NodeEnvEnums.TEST) {
    setConfigEnv = dbConfig.test
}

const DB_NAME: string = setConfigEnv.database!
const DB_USER: string = setConfigEnv.username!
const DB_PASS: string = setConfigEnv.password!
const DB_HOST: string = setConfigEnv.host!
const DB_PORT: number = Number(setConfigEnv.port)

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
