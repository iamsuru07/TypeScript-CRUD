import { QueryResult } from "mysql2";

export interface PostControllerReplyBodyObject {
    code: number,
    status: string,
    message?: string | any,
    data?: Array<Object> | QueryResult
}

export interface PostControllerUpdateObject {
    category?: string,
    content?: string
}

export interface UserControllerReplyBodyObject {
    code: number;
    status: string;
    message?: string | unknown;
    token?: string;
    user?: Object
}

export interface PostModelAttributes {
    id: number;
    user_id: number
    content: string;
    category: string;
    created_at?: Date;
    updated_at?: Date;
}

export interface UserModelAttributes {
    id: number;
    username: string;
    password: string;
    created_at?: Date;
    updated_at?: Date;
}


export interface ThoughtRouteHandlerRequestBody {
    id: number,
    post_id: number,
    content?: string;
    category?: string;
}

export interface ThoughtRouteHandlerRequestQuery {
    id: number,
    category?: string,
    username?: string
}
export interface ThoughtRouteHandlerResponseDataObject {
    code: number,
    status: string,
    message?: string,
    data?: Array<Object> | QueryResult
}

export interface ThoughtRouteHandlerReplyBody {
    status: string;
    message?: string | any;
    data?: Array<Object> | QueryResult
}


export interface UserRouteHandlerRequestBody {
    username: string;
    password: string;
    newUsername: string;
    newPassword: string;
}

export interface UserRouteHandlerDeleteUserParams {
    id: string;
    username: string;
}

export interface UserRouteHandlerReplyBody {
    status: string;
    message?: string | unknown;
    token?: string;
    user?: Object;
}

export interface UserRouteHandlerResponseDataObject {
    code: number;
    status: string;
    message?: string | unknown;
    token?: string;
    user?: Object;
}