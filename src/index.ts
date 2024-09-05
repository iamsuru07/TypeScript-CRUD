import Fastify, { FastifyRequest, FastifyReply } from 'fastify';
import * as dotenv from 'dotenv';
import { constants } from 'http2'
dotenv.config();
import { connectToDatabase } from './utils/dbUtils';
import routes from './routes'

const PORT: number = Number(process.env.PORT) || 3000;

const startServer = async () => {
  await connectToDatabase();

  const server = Fastify({
    logger: true,
  });

  server.get('/', (req: FastifyRequest, reply: FastifyReply) => {
    reply.code(constants.HTTP_STATUS_OK).send({ message: "Welcome to the CRUD API" })
  })

  server.register(routes, { prefix: '/api' })

  server.listen({ port: PORT }, (err) => {
    if (err) {
      server.log.error(err);
      process.exit(1);
    } else {
      server.log.info(`Attribution service server running`, {
        data: {
          payload: {
            port: PORT
          }
        },
      });
    }
  });
}

startServer();