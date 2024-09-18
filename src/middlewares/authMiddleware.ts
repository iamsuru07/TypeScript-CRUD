import { FastifyReply, FastifyRequest } from "fastify";
import { MessageResponseEnum, StatusResponseEnum } from "../constants/enums";
import { constants } from "http2";
import * as jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
import { User } from "../utils/dbUtils";
dotenv.config()

const SECRET_KEY: string = process.env.JWT_SECRET!

//only used for verifying the given token in header

export const authMiddleware = async (req: FastifyRequest, reply: FastifyReply) => {
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        let token = req.headers.authorization.split(" ")[1];
        if (!token) {
            return reply.code(constants.HTTP_STATUS_NOT_FOUND).send({
                status: StatusResponseEnum.FAILED,
                message: MessageResponseEnum.NO_ACCESS_TOKEN_PROVIDED
            })
        }

        try {
            const decoded: any = jwt.verify(token, SECRET_KEY);

            const auth = await User.findOne({ where: { id: decoded.id } })

            if (auth) {
                if (decoded.id === auth.id && decoded.username === auth.username) {
                    return;
                    // return reply.code(constants.HTTP_STATUS_OK).send({
                    //     status: StatusResponseEnum.SUCCESS,
                    //     message: MessageResponseEnum.AUTHORIZED_USER
                    // })
                }
            }

            return reply.code(constants.HTTP_STATUS_UNAUTHORIZED).send({
                status: StatusResponseEnum.FAILED,
                message: MessageResponseEnum.UNAUTHORIZED_USER
            })
        } catch (error) {
            return reply.code(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR).send({
                status: StatusResponseEnum.FAILED,
                message: error
            })
        }
    } else {
        return reply.code(constants.HTTP_STATUS_NOT_FOUND).send({
            status: StatusResponseEnum.FAILED,
            message: MessageResponseEnum.NO_HEADER_PROVIDED
        })
    }
}