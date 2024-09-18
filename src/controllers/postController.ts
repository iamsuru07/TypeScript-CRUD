import { constants } from "http2";
import { MessageResponseEnum, StatusResponseEnum } from "../constants/enums";
import { Post } from "../utils/dbUtils";
import { mySqlConnector } from "../utils/mySqlConnector";
import lodash from 'lodash';
import mysql, { QueryResult } from 'mysql2';
import { PostControllerReplyBodyObject, PostControllerUpdateObject } from "../constants/types";
import { errorHandler } from "../helper/errorHandler";

export const createPostController = async (id: number, category: string, content: string): Promise<PostControllerReplyBodyObject> => {
    try {
        category = lodash.startCase(lodash.toLower(category));
        content = lodash.startCase(lodash.toLower(content));
        const response = await Post.create({ user_id: id, category: category, content: content })
        if (response) {
            return {
                code: constants.HTTP_STATUS_CREATED,
                status: StatusResponseEnum.SUCCESS,
                message: MessageResponseEnum.UPLOADED_SUCCESSFULLY
            }
        }
        return {
            code: constants.HTTP_STATUS_BAD_REQUEST,
            status: StatusResponseEnum.FAILED,
            message: MessageResponseEnum.UNABLE_TO_POST,
        };
    } catch (error) {
        return errorHandler(error)
    }
}

export const getAllPostController = async (): Promise<PostControllerReplyBodyObject> => {
    try {
        const con: mysql.Connection = await mySqlConnector();
        const query = `
            SELECT 
                users.username,
                posts_data.id,
                posts_data.content,
                posts_data.category,
                posts_data.created_at,
                posts_data.updated_at 
            FROM users 
            INNER JOIN posts_data ON users.id = posts_data.user_id;
        `;
        const [rows] = await con.promise().query(query);
        con.end();
        return {
            code: constants.HTTP_STATUS_OK,
            status: StatusResponseEnum.SUCCESS,
            data: rows
        }
    } catch (error) {
        return errorHandler(error);
    }
};

export const getPostByFilterController = async (id?: number, category?: string, username?: string): Promise<PostControllerReplyBodyObject> => {
    try {
        const con: mysql.Connection = await mySqlConnector();

        let query = `
            SELECT 
                users.username,
                posts_data.id,
                posts_data.content,
                posts_data.category,
                posts_data.created_at,
                posts_data.updated_at 
            FROM users 
            INNER JOIN posts_data ON users.id = posts_data.user_id
        `;

        const queryParams: Array<number | string> = [];

        if (id || category || username) {
            query += ' WHERE';
        }

        if (id) {
            query += ' users.id = ?';
            queryParams.push(id);
        }

        if (category) {
            category = lodash.startCase(lodash.toLower(category));
            if (queryParams.length > 0) query += ' AND';
            query += ' posts_data.category = ?';
            queryParams.push(category);
        }

        if (username) {
            if (queryParams.length > 0) query += ' AND';
            query += ' users.username = ?';
            queryParams.push(username);
        }

        const [rows] = await con.promise().query(query, queryParams);
        con.end();

        return {
            code: constants.HTTP_STATUS_OK,
            status: StatusResponseEnum.SUCCESS,
            data: rows
        };
    } catch (error) {
        return errorHandler(error);
    }
};

export const updatePostController = async (post_id: number, category?: string, content?: string): Promise<PostControllerReplyBodyObject> => {
    const updateObject: PostControllerUpdateObject = {};

    if (category) {
        category = lodash.startCase(lodash.toLower(category));
        updateObject.category = category;
    }

    if (content) {
        content = lodash.startCase(lodash.toLower(content));
        updateObject.content = content;
    }

    try {
        const isUpdated: [number] = await Post.update(updateObject, { where: { id: post_id } })

        if (!isUpdated) {
            return {
                code: constants.HTTP_STATUS_BAD_REQUEST,
                status: StatusResponseEnum.FAILED,
                message: MessageResponseEnum.REQUEST_NOT_FULFILLED
            }
        }

        return {
            code: constants.HTTP_STATUS_OK,
            status: StatusResponseEnum.SUCCESS,
            message: MessageResponseEnum.UPLOADED_SUCCESSFULLY
        }
    } catch (error) {
        return errorHandler(error);
    }
}

export const deletePostController = async (post_id: number): Promise<PostControllerReplyBodyObject> => {
    try {
        const isDeleted: number = await Post.destroy({ where: { id: post_id } })

        if (!isDeleted) {
            return {
                code: constants.HTTP_STATUS_BAD_REQUEST,
                status: StatusResponseEnum.FAILED,
                message: MessageResponseEnum.REQUEST_NOT_FULFILLED
            }
        }

        return {
            code: constants.HTTP_STATUS_OK,
            status: StatusResponseEnum.SUCCESS,
            message: MessageResponseEnum.POST_DELETED_SUCCESSFULLY
        }
    } catch (error) {
        return errorHandler(error);
    }
}