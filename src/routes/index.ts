import { FastifyInstance } from 'fastify';
import userRoutes from './userRoutes';
import thoughtUploaderRoutes from './thoughtUploaderRoutes';

const routes = async (fastify: FastifyInstance) => {
    await userRoutes(fastify);
    await thoughtUploaderRoutes(fastify);
};
export default routes;