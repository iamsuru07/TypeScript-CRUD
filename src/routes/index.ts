import { FastifyInstance } from 'fastify';
import userRoutes from './userRoutes';

const routes = async (fastify: FastifyInstance) => {
    await userRoutes(fastify);
};

export default routes;