import { FastifySchema } from 'fastify';

const commonResponseSchema = {
    type: "object",
    properties: {
        status: { type: "string" },
        message: { type: "string" },
    },
    required: ["status", "message"],
}

export const createPostSchema: FastifySchema = {
    body: {
        type: 'object',
        properties: {
            id: { type: 'number' },
            content: { type: 'string' },
            category: { type: 'string' }
        },
        required: ["id", "content", "category"]
    },
    response: {
        201: commonResponseSchema,
        400: commonResponseSchema,
        500: commonResponseSchema
    }
}

export const getAllPostSchema: FastifySchema = {
    response: {
        200: {
            type: 'object',
            properties: {
                code: { type: 'number' },
                status: { type: 'string' },
                data: {
                    type: 'array',
                    properties: {
                        username: { type: "string" },
                        id: { type: "number" },
                        content: { type: "string" },
                        category: { type: "string" },
                        created_at: { type: "string", format: "date-time" },
                        updated_at: { type: "string", format: "date-time" },
                    }
                }
            }
        },
        500: commonResponseSchema
    }
}

export const getPostsByFilterSchema: FastifySchema = {
    querystring: {
        type: 'object',
        properties: {
            id: { type: 'number' },
            category: { type: 'string' },
            username: { type: 'string' }
        },
        required: ['id']
    },
    response: {
        200: {
            type: 'object',
            properties: {
                code: { type: 'number' },
                status: { type: 'string' },
                data: {
                    type: 'array',
                    properties: {
                        username: { type: "string" },
                        id: { type: "number" },
                        content: { type: "string" },
                        category: { type: "string" },
                        created_at: { type: "string", format: "date-time" },
                        updated_at: { type: "string", format: "date-time" },
                    }
                }
            }
        },
        400: commonResponseSchema,
        500: commonResponseSchema
    }
}

export const updatePostSchema: FastifySchema = {
    body: {
        type: 'object',
        properties: {
            id: { type: 'number' },
            post_id: { type: 'number' },
            content: { type: 'string' },
            category: { type: 'string' }
        },
        required: ['id', 'post_id']
    },
    response: {
        200: commonResponseSchema,
        400: commonResponseSchema,
        500: commonResponseSchema
    }
}

export const deletePostSchema: FastifySchema = {
    body: {
        type: 'object',
        properties: {
            id: { type: 'string' },
            post_id: { type: 'string' }
        },
        required: ['id', 'post_id']
    },
    response: {
        200: commonResponseSchema,
        400: commonResponseSchema,
        500: commonResponseSchema
    }
}