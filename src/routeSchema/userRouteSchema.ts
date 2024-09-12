import { FastifySchema } from 'fastify';

const commonResponseSchema = {
    type: "object",
    properties: {
        status: { type: "string" },
        message: { type: "string" },
    },
    required: ["status", "message"],
}

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
        400: commonResponseSchema,
        409: commonResponseSchema,
        500: commonResponseSchema,
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
        400: commonResponseSchema,
        401: commonResponseSchema,
        404: commonResponseSchema,
        500: commonResponseSchema,
    },
};

export const updatePasswordSchema: FastifySchema = {
    body: {
        type: "object",
        properties: {
            id: { type: "number" },
            username: { type: "string" },
            password: { type: "string" },
            newPassword: { type: "string" }
        },
        required: ["id", "username", "password", "newPassword"],
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
        400: commonResponseSchema,
        404: commonResponseSchema,
        409: commonResponseSchema,
        500: commonResponseSchema

    },
};

export const updateUsernameSchema: FastifySchema = {
    body: {
        type: 'object',
        properties: {
            id: { type: 'number' },
            username: { type: 'string' },
            newUsername: { type: 'string' }
        },
        required: ["username", "newUsername"],
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
        400: commonResponseSchema,
        404: commonResponseSchema,
        409: commonResponseSchema,
        500: commonResponseSchema
    }
}

export const deleteUserSchema: FastifySchema = {
    params: {
        type: 'object',
        properties: {
            id: { type: 'string' },
            username: { type: 'string' }
        }
    },
    response: {
        200: commonResponseSchema,
        400: commonResponseSchema,
        404: commonResponseSchema,
        500: commonResponseSchema
    }

}