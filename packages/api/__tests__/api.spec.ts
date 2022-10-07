import 'dotenv/config';
import Hapi from '@hapi/hapi';
import Transport from '@hibrain-trainee-nats/common/src/Transport';
import { StorageMethods } from '@hibrain-trainee-nats/common/src/constants';
import * as Server from '../src/server';

const mockPublish = async (subject: string, payload) => {
  let respond = {};

  switch (subject) {
    case StorageMethods.getMessages:

      respond = {
        messages: [
          {
            id: 1,
            date: '2022-09-01T08:44:36.152Z',
            title: 'test 1',
            content: 'test content 1',
          },
          {
            id: 2,
            date: '2022-09-02T10:44:36.162Z',
            title: 'test 2',
            content: 'test content 2',
          },
        ],
      };
      break;

    case StorageMethods.postMessage:
      respond = {
        message: {
          id: payload,
          date: '2022-09-01T08:44:36.152Z',
          title: 'test 1',
          content: 'test content 1',
        },
      };
      break;

    default:
      break;
  }

  return respond;
};

jest.mock('@hibrain-trainee-nats/common/src/Transport');

const publishMock = jest
  .spyOn(Transport.prototype, 'publish')
  .mockImplementation(mockPublish);

describe('API', () => {
  let server: Hapi.Server;

  beforeEach(async () => {
    server = await Server.init();
  });

  afterEach(async () => {
    await server.stop();
  });

  test.skip('smoke', async () => {
    server.route({
      method: 'GET',
      path: '/test',
      handler: () => 'OK',
    });

    const res = await server.inject({
      method: 'GET',
      url: '/test',
    });

    expect(res.statusCode).toBe(200);
  });

  test('findMessages', async () => {
    const res = await server.inject({
      method: 'GET',
      url: '/api/test',
    });

    expect(publishMock).toHaveBeenCalledWith(StorageMethods.getMessages, {});
    expect(res.statusCode).toBe(200);
  });

  test('findMessage', async () => {
    const msgId = 3;
    const res = await server.inject({
      method: 'GET',
      url: `/api/test/${msgId}`,
    });

    expect(publishMock).toHaveBeenCalledWith(StorageMethods.getMessagesById, { id: msgId });
    expect(res.statusCode).toBe(200);
  });
});
