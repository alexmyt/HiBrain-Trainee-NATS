/* eslint-disable no-undef */
import 'dotenv/config';
import Hapi from '@hapi/hapi';
import { expect } from 'chai';
import Transport from '../src/common/Transport';
import * as Server from '../src/api/server';
import * as Service from '../src/storage/service';

describe('API and service', () => {
  let server: Hapi.Server;
  let transport: Transport;

  before(async () => {
    server = await Server.init();
    transport = await Service.startService();
  });

  after(async () => {
    await server.stop();
    await Service.stopService();
  });

  it('GET /api/test', async () => {
    const res = await server.inject({
      url: '/api/test',
      method: 'GET',
    });

    expect(res.result)
      .to.be.an('object')
      .with.property('messages')
      .that.be.an('array')
      .with.length.gte(3);
  });
});
