import {
  Server, Request, ResponseToolkit,
} from '@hapi/hapi';
import Joi from 'joi';
import Transport from '../../common/Transport';
import { StorageMethods } from '../../common/constants';

async function findMessage(request: Request, h: ResponseToolkit) {
  const transport = new Transport();
  await transport.connect();
  const respond = await transport.publish(StorageMethods.getMessages, request.params);
  await transport.disconnect();
  return h.response(respond);
}

async function getMessageById(request: Request, h: ResponseToolkit) {
  const transport = new Transport();
  await transport.connect();
  const respond = await transport.publish(StorageMethods.getMessagesById, request.params);
  await transport.disconnect();
  return h.response(respond);
}

const schemaGet = Joi.object({
  id: Joi.number().integer(),
});

const testRoute = {
  name: 'testRoute',
  register(server: Server) {
    server.route([
      {
        method: 'GET',
        path: '/api/test',
        handler: findMessage,
      },

      {
        method: 'GET',
        path: '/api/test/{id}',
        options: {
          handler: getMessageById,
          validate: {
            params: schemaGet,
            failAction: (request, h, err) => { throw err; },
          },
        },
      },
    ]);
  },
};

export default testRoute;
