import mysql from 'mysql2';
import * as dotenv from 'dotenv';
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

export const mySqlConnector = (): Promise<mysql.Connection> => {
    return new Promise((resolve, reject) => {
        const con = mysql.createConnection({
            host: DB_HOST,
            user: DB_USER,
            password: DB_PASS,
            database: DB_NAME,
            multipleStatements: true
        });

        con.connect((err) => {
            if (err) {
                console.log('Database Connection Failed !!!', err);
                reject(err);
                return;
            }
            console.log('Database Connected Successfully!');
            resolve(con);
        });
    });
};