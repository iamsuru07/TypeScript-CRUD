import { FastifyReply, FastifyRequest } from "fastify";
import { MessageResponseEnum, StatusResponseEnum } from "../constants/enums";
import { constants } from "http2";
import * as jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
import { User } from "../utils/dbUtils";
dotenv.config()

const SECRET_KEY: string = process.env.JWT_SECRET!

export const verifyUser = async (req: FastifyRequest, reply: FastifyReply) => {
    const tokenResponse = await verifyToken(req);
    if (tokenResponse.code === constants.HTTP_STATUS_OK) {
        return;
    }

    const response = {
        status: tokenResponse.status,
        message: tokenResponse.message
    }

    return reply.code(tokenResponse.code).send(response)
}


const verifyToken = async (req: FastifyRequest) => {
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        let token = req.headers.authorization.split(" ")[1];
        if (!token) {
            return {
                status: StatusResponseEnum.FAILED,
                code: constants.HTTP_STATUS_NOT_FOUND,
                message: MessageResponseEnum.NO_ACCESS_TOKEN_PROVIDED
            }
        }

        try {
            const decoded: any = await jwt.verify(token, SECRET_KEY);

            const auth = await User.findOne({ where: { id: decoded.id } })

            if (auth) {
                if (decoded.id === auth.id && decoded.username === auth.username) {
                    return {
                        code: constants.HTTP_STATUS_OK,
                        status: StatusResponseEnum.SUCCESS,
                        message: MessageResponseEnum.AUTHORIZED_USER
                    }
                }
            }

            return {
                code: constants.HTTP_STATUS_UNAUTHORIZED,
                status: StatusResponseEnum.FAILED,
                message: MessageResponseEnum.UNAUTHORIZED_USER
            }
        } catch (error) {
            return {
                code: constants.HTTP_STATUS_INTERNAL_SERVER_ERROR,
                status: StatusResponseEnum.FAILED,
                message: error
            }
        }
    } else {
        return {
            status: StatusResponseEnum.FAILED,
            code: constants.HTTP_STATUS_NOT_FOUND,
            message: MessageResponseEnum.NO_ACCESS_TOKEN_PROVIDED
        }
    }
}