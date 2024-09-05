import { FastifyReply, FastifyRequest } from "fastify";
import { constants } from "http2";
import { MessageResponseEnum, StatusResponseEnum } from "../constants/enums";
import { changePasswordController, loginController, signUpController } from "../controllers/userController";

interface RequestBody {
    username: string;
    password: string;
    newPassword: string;
}

interface ReplyBody {
    status: string;
    message: string;
    token?: string
}

interface responseDataObject {
    code: number,
    status: string,
    message: string,
    token?: string
}

export const signUpHandler = async (req: FastifyRequest<{ Body: RequestBody }>, reply: FastifyReply) => {
    try {
        const reqBody = req.body;

        const username: string = reqBody.username
        const password: string = reqBody.password

        if (!username) {
            return reply.code(constants.HTTP_STATUS_BAD_REQUEST).send({
                status: StatusResponseEnum.FAILED,
                message: MessageResponseEnum.USERNAME_IS_REQUIRED
            })
        }

        if (!password) {
            return reply.code(constants.HTTP_STATUS_BAD_REQUEST).send({
                status: StatusResponseEnum.FAILED,
                message: MessageResponseEnum.PASSWORD_IS_REQUIRED
            })
        }

        const responseData: responseDataObject = await signUpController(username, password)

        let response: ReplyBody = {
            status: responseData.status,
            message: responseData.message
        }

        return reply.code(responseData.code).send(response);
    } catch (error) {
        let errorMessage: string;

        if (error instanceof Error) {
            errorMessage = error.message;
        } else {
            errorMessage = String(error)
        }

        const response: ReplyBody = {
            status: StatusResponseEnum.FAILED,
            message: errorMessage,
        };

        return reply.code(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR).send(response);
    }
};


export const loginHandler = async (req: FastifyRequest<{ Body: RequestBody }>, reply: FastifyReply) => {
    try {
        const reqBody = req.body;

        const username: string = reqBody.username
        const password: string = reqBody.password

        if (!username) {
            return reply.code(constants.HTTP_STATUS_BAD_REQUEST).send({
                status: StatusResponseEnum.FAILED,
                message: MessageResponseEnum.USERNAME_IS_REQUIRED
            })
        }

        if (!password) {
            return reply.code(constants.HTTP_STATUS_BAD_REQUEST).send({
                status: StatusResponseEnum.FAILED,
                message: MessageResponseEnum.PASSWORD_IS_REQUIRED
            })
        }

        const responseData: responseDataObject = await loginController(username, password)

        let response: ReplyBody = {
            status: responseData.status,
            message: responseData.message,
            token: responseData.token
        }

        return reply.code(responseData.code).send(response);
    } catch (error) {
        let errorMessage: string;

        if (error instanceof Error) {
            errorMessage = error.message;
        } else {
            errorMessage = String(error)
        }

        const response: ReplyBody = {
            status: StatusResponseEnum.FAILED,
            message: errorMessage,
        };

        return reply.code(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR).send(response);
    }
};


export const changePasswordHandler = async (req: FastifyRequest<{ Body: RequestBody }>, reply: FastifyReply) => {
    const reqBody = req.body;

    const username: string = reqBody.username
    const password: string = reqBody.password
    const newPassword: string = reqBody.newPassword
    
    if (!username) {
        return reply.code(constants.HTTP_STATUS_BAD_REQUEST).send({
            status: StatusResponseEnum.FAILED,
            message: MessageResponseEnum.USERNAME_IS_REQUIRED
        })
    }

    if (!password) {
        return reply.code(constants.HTTP_STATUS_BAD_REQUEST).send({
            status: StatusResponseEnum.FAILED,
            message: MessageResponseEnum.PASSWORD_IS_REQUIRED
        })
    }

    if (!newPassword) {
        return reply.code(constants.HTTP_STATUS_BAD_REQUEST).send({
            status: StatusResponseEnum.FAILED,
            message: MessageResponseEnum.NEW_PASSWORD_IS_REQUIRED
        })
    }

    if(password===newPassword){
        return reply.code(constants.HTTP_STATUS_BAD_REQUEST).send({
            status: StatusResponseEnum.FAILED,
            message: MessageResponseEnum.PASSWORD_CANNOT_BE_SAME
        })
    }

    const responseData:responseDataObject = await changePasswordController(username,password,newPassword)

    let response: ReplyBody = {
        status: responseData.status,
        message: responseData.message
    }

    return reply.code(responseData.code).send(response);
}