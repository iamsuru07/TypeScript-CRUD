import { FastifyReply, FastifyRequest } from "fastify";
import { MessageResponseEnum, StatusResponseEnum } from "../constants/enums";
import { constants } from "http2";
import * as jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
import { User } from "../utils/dbUtils";
dotenv.config()

const SECRET_KEY: string = process.env.JWT_SECRET!

//used for verifying that the user is verified or not by using the given id in [params,body.query] by comparing with the given token

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

        //need to fix this as any is not a good choice
        const { id }: any = req.body || req.params || req.query

        if (!id) {
            return {
                status: StatusResponseEnum.FAILED,
                code: constants.HTTP_STATUS_NOT_FOUND,
                message: MessageResponseEnum.IMPROPER_DETAILS_ARE_PROVIDED
            }
        }

        try {
            const decoded: any = await jwt.verify(token, SECRET_KEY);

            const authByToken = await User.findOne({ where: { id: decoded.id } })
            const authByGivenId = await User.findOne({ where: { id } })

            if (authByToken) {
                if (authByGivenId && (authByGivenId.id === authByToken.id && authByGivenId.username === authByToken.username)) {
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
            message: MessageResponseEnum.NO_HEADER_PROVIDED
        }
    }
}