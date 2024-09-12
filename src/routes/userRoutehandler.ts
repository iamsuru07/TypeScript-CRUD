import { FastifyReply, FastifyRequest } from "fastify";
import { constants } from "http2";
import { MessageResponseEnum, StatusResponseEnum } from "../constants/enums";
import { deleteUserController, loginController, signUpController, updatePasswordController, updateUsernameController } from "../controllers/userController";

interface RequestBody {
    username: string;
    password: string;
    newUsername: string;
    newPassword: string;
}

interface DeleteUserParams {
    id: string;
    username: string;
}

export interface ReplyBody {
    status: string;
    message: string | unknown;
    token?: string;
    user?: Object;
}

export interface ResponseDataObject {
    code: number;
    status: string;
    message: string | unknown;
    token?: string;
    user?: Object;
}

export const signUpHandler = async (req: FastifyRequest<{ Body: RequestBody }>, reply: FastifyReply): Promise<ReplyBody> => {
    const reqBody: RequestBody = req.body;

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

    const responseData: ResponseDataObject = await signUpController(username, password)

    let response: ReplyBody = {
        status: responseData.status,
        message: responseData.message
    }

    return reply.code(responseData.code).send(response);
};

export const loginHandler = async (req: FastifyRequest<{ Body: RequestBody }>, reply: FastifyReply): Promise<ReplyBody> => {
    const reqBody: RequestBody = req.body;

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

    const responseData: ResponseDataObject = await loginController(username, password)

    let response: ReplyBody = {
        status: responseData.status,
        message: responseData.message,
        user: responseData.user,
        token: responseData.token
    }

    return reply.code(responseData.code).send(response);
}

export const updatePasswordHandler = async (req: FastifyRequest<{ Body: RequestBody }>, reply: FastifyReply): Promise<ReplyBody> => {
    const reqBody: RequestBody = req.body;

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

    if (password === newPassword) {
        return reply.code(constants.HTTP_STATUS_BAD_REQUEST).send({
            status: StatusResponseEnum.FAILED,
            message: MessageResponseEnum.PASSWORD_CANNOT_BE_SAME
        })
    }

    const responseData: ResponseDataObject = await updatePasswordController(username, password, newPassword)

    let response: ReplyBody = {
        status: responseData.status,
        message: responseData.message
    }

    return reply.code(responseData.code).send(response);
}

export const updateUsernameHandler = async (req: FastifyRequest<{ Body: RequestBody }>, reply: FastifyReply): Promise<ReplyBody> => {

    const reqBody: RequestBody = req.body;

    const username: string = reqBody.username
    const newUsername: string = reqBody.newUsername

    if (!username) {
        return reply.code(constants.HTTP_STATUS_BAD_REQUEST).send({
            status: StatusResponseEnum.FAILED,
            message: MessageResponseEnum.USERNAME_IS_REQUIRED
        })
    }

    if (!newUsername) {
        return reply.code(constants.HTTP_STATUS_BAD_REQUEST).send({
            status: StatusResponseEnum.FAILED,
            message: MessageResponseEnum.NEW_USERNAME_IS_REQUIRED
        })
    }

    if (username === newUsername) {
        return reply.code(constants.HTTP_STATUS_BAD_REQUEST).send({
            status: StatusResponseEnum.FAILED,
            message: MessageResponseEnum.USERNAME_CANNOT_BE_SAME
        })
    }

    const responseData: ResponseDataObject = await updateUsernameController(username, newUsername)

    let response: ReplyBody = {
        status: responseData.status,
        message: responseData.message,
        user: responseData.user,
        token: responseData.token
    }

    return reply.code(responseData.code).send(response);
}

export const deleteUserHandler = async (
    req: any, //need to fix this like other thing is not working here
    reply: FastifyReply
): Promise<ReplyBody> => {
    const { id, username }: DeleteUserParams = req.params;

    if (!id) {
        return reply.code(constants.HTTP_STATUS_BAD_REQUEST).send({
            status: StatusResponseEnum.FAILED,
            message: MessageResponseEnum.ID_IS_REQUIRED
        });
    }

    if (!username) {
        return reply.code(constants.HTTP_STATUS_BAD_REQUEST).send({
            status: StatusResponseEnum.FAILED,
            message: MessageResponseEnum.USERNAME_IS_REQUIRED
        });
    }

    const responseData: ResponseDataObject = await deleteUserController(Number(id), username);

    const response: ReplyBody = {
        status: responseData.status,
        message: responseData.message
    };

    return reply.code(responseData.code).send(response);
};