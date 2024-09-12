import * as dotenv from 'dotenv';
import { FastifyReply, FastifyRequest } from 'fastify';
import * as jwt from 'jsonwebtoken'
import { User } from '../utils/dbUtils';
import { MessageResponseEnum, StatusResponseEnum } from '../constants/enums';
import { constants } from 'http2';
dotenv.config()
const SECRET_KEY: string = process.env.JWT_SECRET!

export const generateJWTToken = async (id: number, username: string): Promise<string> => {
    let generateToken: string = "";
    try {
        generateToken = await jwt.sign({ id, username }, SECRET_KEY, { expiresIn: '24h' })
    } catch (error) {
        console.log(error)
    }
    return generateToken;
}

export const verifyToken = async (req: FastifyRequest, reply: FastifyReply) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        try {
            token = req.headers.authorization.split(" ")[1]

            const decoded: any = jwt.verify(token, SECRET_KEY)

            const auth = await User.findOne({ where: { id: decoded.id } })

            if (!auth) {
                return {
                    code: constants.HTTP_STATUS_UNAUTHORIZED,
                    status: StatusResponseEnum.FAILED,
                    message: MessageResponseEnum.UNAUTHORIZED_USER
                }
            }

            return {
                code: constants.HTTP_STATUS_OK,
                status: StatusResponseEnum.SUCCESS,
                message: MessageResponseEnum.AUTHORIZED_USER
            }

        } catch (error) {
            return {
                code: constants.HTTP_STATUS_INTERNAL_SERVER_ERROR,
                status: StatusResponseEnum.FAILED,
                message: error
            }
        }
    }

    if (!token) {
        return {
            code: constants.HTTP_STATUS_BAD_REQUEST,
            status: StatusResponseEnum.FAILED,
            message: MessageResponseEnum.NO_ACCESS_TOKEN_PROVIDED
        }
    }
}