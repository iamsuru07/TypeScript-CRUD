import { Post, User } from "../utils/dbUtils";
import { constants } from "http2";
import { MessageResponseEnum, StatusResponseEnum } from "../constants/enums";
import { passwordHasher, passwordMatcher } from "../helper/passwordHasher";
import { generateJWTToken } from "../helper/generateToken";
import { UserControllerReplyBodyObject } from "../constants/types";
import { errorHandler } from "../helper/errorHandler";

export const signUpController = async (username: string, password: string): Promise<UserControllerReplyBodyObject> => {
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

        const hashedPassword: string = await passwordHasher(password);

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
            message: MessageResponseEnum.REQUEST_NOT_FULFILLED,
        };
    } catch (error) {
        return errorHandler(error);
    }
};

export const loginController = async (username: string, user_password: string): Promise<UserControllerReplyBodyObject> => {
    try {

        const auth = await User.findOne({ where: { username }, raw: true })

        if (!auth) {
            return {
                code: constants.HTTP_STATUS_NOT_FOUND,
                status: StatusResponseEnum.FAILED,
                message: MessageResponseEnum.USER_DOES_NOT_EXISTS,
            };
        }

        const comparePassword: boolean = await passwordMatcher(user_password, auth.password)

        if (!comparePassword) {
            return {
                code: constants.HTTP_STATUS_UNAUTHORIZED,
                status: StatusResponseEnum.FAILED,
                message: MessageResponseEnum.INAVLID_CREDENTIALS,
            };
        }

        const token: string = await generateJWTToken(auth.id, auth.username)

        const { password, ...authWithoutPassword } = auth;

        return {
            code: constants.HTTP_STATUS_OK,
            status: StatusResponseEnum.SUCCESS,
            message: MessageResponseEnum.AUTHENTICATION_SUCCESSFUL,
            user: authWithoutPassword,
            token: token
        };
    } catch (error) {
        return errorHandler(error);
    }
};

export const updatePasswordController = async (username: string, password: string, newPassword: string): Promise<UserControllerReplyBodyObject> => {
    try {
        const auth = await User.findOne({ where: { username }, raw: true })

        if (!auth) {
            return {
                code: constants.HTTP_STATUS_NOT_FOUND,
                status: StatusResponseEnum.FAILED,
                message: MessageResponseEnum.USER_DOES_NOT_EXISTS,
            };
        }

        const comparePassword: boolean = await passwordMatcher(password, auth.password)

        if (!comparePassword) {
            return {
                code: constants.HTTP_STATUS_UNAUTHORIZED,
                status: StatusResponseEnum.FAILED,
                message: MessageResponseEnum.INAVLID_CREDENTIALS,
            };
        }

        const hashedPassword: string = await passwordHasher(newPassword);

        const updatedAuth = await User.update({ password: hashedPassword }, { where: { username } })

        if (!updatedAuth) {
            return {
                code: constants.HTTP_STATUS_BAD_REQUEST,
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
        return errorHandler(error);
    }
};

export const updateUsernameController = async (username: string, newUsername: string): Promise<UserControllerReplyBodyObject> => {
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

        const updatedAuth: [number] = await User.update({ username: newUsername }, { where: { username } })

        if (!updatedAuth) {
            return {
                code: constants.HTTP_STATUS_BAD_REQUEST,
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
        return errorHandler(error);
    }
}

export const deleteUserController = async (id: number, username: string): Promise<UserControllerReplyBodyObject> => {
    try {
        const isUserDeleted: number = await User.destroy({ where: { id: id, username: username } })

        if (isUserDeleted === 0) {
            return {
                code: constants.HTTP_STATUS_NOT_FOUND,
                status: StatusResponseEnum.FAILED,
                message: MessageResponseEnum.USER_DOES_NOT_EXISTS
            };
        }

        if (isUserDeleted > 0) {
            //delete post as well
            //first check that user created some post or not
            const hasSomePost = await Post.findAll({ where: { user_id: id } });
            if (hasSomePost.length > 0) {
                const isPostDeleted = await Post.destroy({ where: { user_id: id } })
                if (isPostDeleted > 0) {
                    return {
                        code: constants.HTTP_STATUS_OK,
                        status: StatusResponseEnum.SUCCESS,
                        message: MessageResponseEnum.USER_ACCOUNT_DELETED
                    };
                }
            } else {
                return {
                    code: constants.HTTP_STATUS_OK,
                    status: StatusResponseEnum.SUCCESS,
                    message: MessageResponseEnum.USER_ACCOUNT_DELETED
                };
            }

        }
        return {
            code: constants.HTTP_STATUS_BAD_REQUEST,
            status: StatusResponseEnum.FAILED,
            message: MessageResponseEnum.REQUEST_NOT_FULFILLED
        };

    } catch (error) {
        return errorHandler(error);
    }
};