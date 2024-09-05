import * as dotenv from 'dotenv';
import * as jwt from 'jsonwebtoken'
dotenv.config()
const SECRET_KEY: string = process.env.JWT_SECRET!

export const generateJWTToken = async (id: number, username: string): Promise<string> => {
    let generateToken: string = "";
    try {
        generateToken = await jwt.sign({ id, username }, SECRET_KEY,{expiresIn:'24h'})
    } catch (error) {
        console.log(error)
    }
    return generateToken;
}