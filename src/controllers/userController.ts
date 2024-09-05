import { User } from "../utils/dbUtils";
import { constants } from "http2";
import { MessageResponseEnum, StatusResponseEnum } from "../constants/enums";
import { passwordHasher, passwordMatcher } from "../helper/passwordHasher";
import { generateJWTToken } from "../helper/generateToken";

interface ReplyBody {
    code: number;
    status: string;
    message: string;
    token?: string
}

export const signUpController = async (username: string, password: string): Promise<ReplyBody> => {
    try {
        // Check if user exists
        const isUserExists = await User.findOne({ where: { username } });
        if (isUserExists) {
            return {
                code: constants.HTTP_STATUS_CONFLICT,
                status: StatusResponseEnum.FAILED,
                message: MessageResponseEnum.USERNAME_ALREADY_EXISTS,
            };
        }

        const hashedPassword = await passwordHasher(password);

        // Create a new user
        const response = await User.create({ username: username, password: hashedPassword });

        if (response) {
            return {
                code: constants.HTTP_STATUS_CREATED,
                status: StatusResponseEnum.SUCCESS,
                message: MessageResponseEnum.USER_CREATED_SUCCESSFULLY,
            };
        }

        return {
            code: constants.HTTP_STATUS_BAD_REQUEST,
            status: StatusResponseEnum.FAILED,
            message: MessageResponseEnum.USER_CREATED_SUCCESSFULLY,
        };
    } catch (error) {
        return {
            code: constants.HTTP_STATUS_INTERNAL_SERVER_ERROR,
            status: StatusResponseEnum.FAILED,
            message: MessageResponseEnum.INTERNAL_SERVER_ERROR,
        };
    }
};


export const loginController = async (username: string, password: string): Promise<ReplyBody> => {
    try {

        const auth = await User.findOne({ where: { username } })

        if (!auth) {
            return {
                code: constants.HTTP_STATUS_NOT_FOUND,
                status: StatusResponseEnum.FAILED,
                message: MessageResponseEnum.USER_DOES_NOT_EXISTS,
            };
        }

        const comparePassword = await passwordMatcher(password, auth.password)

        if (!comparePassword) {
            return {
                code: constants.HTTP_STATUS_UNAUTHORIZED,
                status: StatusResponseEnum.FAILED,
                message: MessageResponseEnum.INAVLID_CREDENTIALS,
            };
        }

        const token = await generateJWTToken(auth.id, auth.username)

        console.log(token)

        return {
            code: constants.HTTP_STATUS_OK,
            status: StatusResponseEnum.SUCCESS,
            message: MessageResponseEnum.AUTHENTICATION_SUCCESSFUL,
            token: token
        };
    } catch (error) {
        return {
            code: constants.HTTP_STATUS_INTERNAL_SERVER_ERROR,
            status: StatusResponseEnum.FAILED,
            message: MessageResponseEnum.INTERNAL_SERVER_ERROR,
        };
    }
};

export const changePasswordController = async (username: string, password: string, newPassword: string): Promise<ReplyBody> => {
    try {

        const auth = await User.findOne({ where: { username } })

        if (!auth) {
            return {
                code: constants.HTTP_STATUS_NOT_FOUND,
                status: StatusResponseEnum.FAILED,
                message: MessageResponseEnum.USER_DOES_NOT_EXISTS,
            };
        }

        const comparePassword = await passwordMatcher(password, auth.password)
        console.log("check ", comparePassword)

        if (!comparePassword) {
            return {
                code: constants.HTTP_STATUS_UNAUTHORIZED,
                status: StatusResponseEnum.FAILED,
                message: MessageResponseEnum.INAVLID_CREDENTIALS,
            };
        }

        const hashedPassword = await passwordHasher(newPassword);

        const updatedAuth = await User.update({ password: hashedPassword }, { where: { username } })

        if (!updatedAuth) {
            return {
                code: constants.HTTP_STATUS_BAD_GATEWAY,
                status: StatusResponseEnum.FAILED,
                message: MessageResponseEnum.PASSWORD_NOT_UPDATED,
            };
        }

        return {
            code: constants.HTTP_STATUS_OK,
            status: StatusResponseEnum.SUCCESS,
            message: MessageResponseEnum.PASSWORD_UPDATED_SUCCESSFULLY,
        };
    } catch (error) {
        return {
            code: constants.HTTP_STATUS_INTERNAL_SERVER_ERROR,
            status: StatusResponseEnum.FAILED,
            message: MessageResponseEnum.INTERNAL_SERVER_ERROR,
        };
    }
};