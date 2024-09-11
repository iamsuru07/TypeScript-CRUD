import { sequelize, User } from "../utils/dbUtils";
import { constants } from "http2";
import { MessageResponseEnum, StatusResponseEnum } from "../constants/enums";
import { passwordHasher, passwordMatcher } from "../helper/passwordHasher";
import { generateJWTToken } from "../helper/generateToken";
import { QueryTypes } from "sequelize";

interface ReplyBody {
    code: number;
    status: string;
    message: string | unknown;
    token?: string;
    user?: Object
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


export const loginController = async (username: string, user_password: string): Promise<ReplyBody> => {
    try {

        const auth = await User.findOne({ where: { username }, raw: true })

        if (!auth) {
            return {
                code: constants.HTTP_STATUS_NOT_FOUND,
                status: StatusResponseEnum.FAILED,
                message: MessageResponseEnum.USER_DOES_NOT_EXISTS,
            };
        }

        const comparePassword = await passwordMatcher(user_password, auth.password)

        if (!comparePassword) {
            return {
                code: constants.HTTP_STATUS_UNAUTHORIZED,
                status: StatusResponseEnum.FAILED,
                message: MessageResponseEnum.INAVLID_CREDENTIALS,
            };
        }

        const token = await generateJWTToken(auth.id, auth.username)

        const { password, ...authWithoutPassword } = auth;

        return {
            code: constants.HTTP_STATUS_OK,
            status: StatusResponseEnum.SUCCESS,
            message: MessageResponseEnum.AUTHENTICATION_SUCCESSFUL,
            user: authWithoutPassword,
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

export const updatePasswordController = async (username: string, password: string, newPassword: string): Promise<ReplyBody> => {
    try {

        const auth = await User.findOne({ where: { username }, raw: true })

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

export const updateUsernameController = async (username: string, newUsername: string): Promise<ReplyBody> => {
    try {
        const auth = await User.findOne({ where: { username }, raw: true })
        if (!auth) {
            return {
                code: constants.HTTP_STATUS_NOT_FOUND,
                status: StatusResponseEnum.FAILED,
                message: MessageResponseEnum.USER_DOES_NOT_EXISTS,
            };
        }

        const isUsernameTaken = await User.findOne({ where: { username: newUsername } })

        if (isUsernameTaken) {
            return {
                code: constants.HTTP_STATUS_CONFLICT,
                status: StatusResponseEnum.FAILED,
                message: MessageResponseEnum.USERNAME_ALREADY_EXISTS,
            };
        }

        const updatedAuth = await User.update({ username: newUsername }, { where: { username } })

        if (!updatedAuth) {
            return {
                code: constants.HTTP_STATUS_BAD_GATEWAY,
                status: StatusResponseEnum.FAILED,
                message: MessageResponseEnum.USERNAME_NOT_UPDATED,
            };
        }

        //cause we have changed the username so that token value also got changed so we have to change that to in token.
        const token: string = await generateJWTToken(auth.id, newUsername)

        //changing the username for FE
        auth.username = newUsername;

        const { password, ...authWithoutPassword } = auth;

        return {
            code: constants.HTTP_STATUS_OK,
            status: StatusResponseEnum.SUCCESS,
            message: MessageResponseEnum.USERNAME_UPDATED_SUCCESSFULLY,
            user: authWithoutPassword,
            token: token
        };
    } catch (error) {
        return {
            code: constants.HTTP_STATUS_INTERNAL_SERVER_ERROR,
            status: StatusResponseEnum.FAILED,
            message: MessageResponseEnum.INTERNAL_SERVER_ERROR,
        };
    }
}

export const deleteUserController = async (id: number, username: string): Promise<ReplyBody> => {
    try {
        const affectedRows = await User.destroy({ where: { id: id, username: username } })

        if (affectedRows > 0) {
            return {
                code: constants.HTTP_STATUS_OK,
                status: StatusResponseEnum.SUCCESS,
                message: MessageResponseEnum.USER_ACCOUNT_DELETED
            };
        } else {
            return {
                code: constants.HTTP_STATUS_NOT_FOUND,
                status: StatusResponseEnum.FAILED,
                message: MessageResponseEnum.USER_DOES_NOT_EXISTS
            };
        }
    } catch (error) {
        console.error('Error deleting user:', error);
        return {
            code: constants.HTTP_STATUS_INTERNAL_SERVER_ERROR,
            status: StatusResponseEnum.FAILED,
            message: error
        };
    }
};