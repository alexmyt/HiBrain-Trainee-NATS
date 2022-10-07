/* eslint-disable no-undef */
import 'dotenv/config';
import Hapi from '@hapi/hapi';
import * as Server from '../packages/api/src/server';
import * as Service from '../packages/storage/src/service';

describe('API and service', () => {
  let server: Hapi.Server;

  beforeAll(async () => {
    server = await Server.init();
    await Service.startService();
  });

  afterAll(async () => {
    await server.stop();
    await Service.stopService();
  });

  it('GET /api/test', async () => {
    const res = await server.inject({
      url: '/api/test',
      method: 'GET',
    });

    expect(res.result).toBeDefined();
    expect(res.result).toHaveProperty('messages');

    // expect(res.result).toEqual(expect.any(Array));
    // expect(res.result).toHaveLength(5);
    // expect(res.result).toBeGreaterThanOrEqual(3);
  });

  it('GET /api/test/{id}', async () => {
    const res = await server.inject({
      url: '/api/test/1',
      method: 'GET',
    });

    expect(res.result).toEqual(expect.any(Object));
    expect(res.result).toHaveProperty('message');
    // expect(res.result.message).toEqual(expect.any(Object)) .toHaveProperty('id', 1);
  });
});
