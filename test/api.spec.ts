/* eslint-disable no-undef */
import 'dotenv/config';
import Hapi from '@hapi/hapi';
import { expect } from 'chai';
import * as Server from '../src/api/server';

describe('API', () => {
  let server: Hapi.Server;

  beforeEach(async () => {
    server = await Server.init();
  });

  afterEach(async () => {
    await server.stop();
  });

  it('respond with 200', async () => {
    server.route({
      method: 'GET',
      path: '/test',
      handler: () => 'OK',
    });

    const res = await server.inject({
      method: 'GET',
      url: '/test',
    });

    expect(res.statusCode).to.eq(200);
  });
});
