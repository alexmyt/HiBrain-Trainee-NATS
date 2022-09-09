/* eslint-disable no-console */
import { Server, ServerOptions } from '@hapi/hapi';
import testRoute from './routes/test';

const serverOptions: ServerOptions = {
  port: process.env.API_PORT || 3000,
  host: process.env.API_HOST || 'localhost',
};

export const init = async () => {
  const server = new Server(serverOptions);

  await server.register([testRoute]);

  return server;
};

export const start = async () => {
  const server = await init();
  await server.start();

  console.log(`Server running on ${server.info.uri}`);

  return server;
};

process.on('unhandledRejection', (err) => {
  console.log(err);
  process.exit(1);
});
