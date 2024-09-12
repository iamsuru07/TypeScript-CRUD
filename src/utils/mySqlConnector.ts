import mysql from 'mysql2';
import * as dotenv from 'dotenv';
dotenv.config();

const DB_NAME: string = process.env.DB_NAME!;
const DB_USER: string = process.env.DB_USER!;
const DB_PASS: string = process.env.DB_PASS!;
const DB_HOST: string = process.env.DB_HOST!;
const DB_PORT: number = Number(process.env.DB_PORT);

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