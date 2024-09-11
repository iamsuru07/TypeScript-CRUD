import { FastifySchema } from 'fastify';

export const signUpSchema: FastifySchema = {
    body: {
        type: "object",
        properties: {
            username: { type: "string" },
            password: { type: "string" },
        },
        required: ["username", "password"],
    },
    response: {
        201: {
            type: "object",
            properties: {
                status: { type: "string" },
                message: { type: "string" },
            },
            required: ["status", "message"],
        },
        400: {
            type: "object",
            properties: {
                status: { type: "string" },
                message: { type: "string" },
            },
            required: ["status", "message"],
        },
        409: {
            type: "object",
            properties: {
                status: { type: "string" },
                message: { type: "string" },
            },
            required: ["status", "message"],
        },
        500: {
            type: "object",
            properties: {
                status: { type: "string" },
                message: { type: "string" },
            },
            required: ["status", "message"],
        },
    },
};

export const loginSchema: FastifySchema = {
    body: {
        type: "object",
        properties: {
            username: { type: "string" },
            password: { type: "string" },
        },
        required: ["username", "password"],
    },
    response: {
        200: {
            type: "object",
            properties: {
                status: { type: "string" },
                message: { type: "string" },
                token: { type: "string" },
                user: {
                    type: "object",
                    properties: {
                        id: { type: "number" },
                        username: { type: "string" },
                        created_at: { type: "string", format: "date-time" },
                        updated_at: { type: "string", format: "date-time" }
                    }
                }
            },
            required: ["status", "message", "token", "user"],
        },
        400: {
            type: "object",
            properties: {
                status: { type: "string" },
                message: { type: "string" },
            },
            required: ["status", "message"],
        },
        401: {
            type: "object",
            properties: {
                status: { type: "string" },
                message: { type: "string" },
            },
            required: ["status", "message"],
        },
        404: {
            type: "object",
            properties: {
                status: { type: "string" },
                message: { type: "string" },
            },
            required: ["status", "message"],
        },
        500: {
            type: "object",
            properties: {
                status: { type: "string" },
                message: { type: "string" },
            },
            required: ["status", "message"],
        },
    },
};

export const changePasswordSchema: FastifySchema = {
    body: {
        type: "object",
        properties: {
            username: { type: "string" },
            password: { type: "string" },
        },
        required: ["username", "password"],
    },
    response: {
        200: {
            type: "object",
            properties: {
                status: { type: "string" },
                message: { type: "string" },
                token: { type: "string" }
            },
            required: ["status", "message"],
        },
        400: {
            type: "object",
            properties: {
                status: { type: "string" },
                message: { type: "string" },
            },
            required: ["status", "message"],
        },
        401: {
            type: "object",
            properties: {
                status: { type: "string" },
                message: { type: "string" },
            },
            required: ["status", "message"],
        },
        404: {
            type: "object",
            properties: {
                status: { type: "string" },
                message: { type: "string" },
            },
            required: ["status", "message"],
        },
        500: {
            type: "object",
            properties: {
                status: { type: "string" },
                message: { type: "string" },
            },
            required: ["status", "message"],
        },
    },
};