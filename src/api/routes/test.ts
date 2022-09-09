import {
  Server, Request, ResponseToolkit,
} from '@hapi/hapi';
import Joi from 'joi';
import Transport from '../../common/Transport';
import { StorageMethods } from '../../common/constants';

async function testController(request: Request, h: ResponseToolkit) {
  const transport = new Transport();
  await transport.connect();
  const respond = await transport.publish(StorageMethods.find, request.params);
  await transport.disconnect();
  return h.response(respond);
}

const schemaGet = Joi.object({
  id: Joi.number().integer(),
});

const testRoute = {
  name: 'testRoute',
  register(server: Server) {
    server.route({
      method: 'GET',
      path: '/api/test/{id?}',
      options: {
        handler: testController,
        validate: {
          params: schemaGet,
          failAction: (request, h, err) => { throw err; },
        },
      },
    });
  },
};

export default testRoute;
