/* eslint-disable no-undef */
import 'dotenv/config';
import { DataSource } from 'typeorm';
import Transport from '@hibrain-trainee-nats/common/src/Transport';
import { StorageMethods } from '@hibrain-trainee-nats/common/src/constants';
import { startService, stopService } from '../src/service';
import AppDataSource from '../src/data-source';
import GetMessagesHandler from '../src/handlers/GetMessagesHandler';
import GetMessageByIdHandler from '../src/handlers/GetMessageByIdHandler';

describe('Storage service', () => {
  let transport: Transport;

  beforeAll(async () => {
    transport = await startService();
  });

  afterAll(async () => {
    await stopService();
  });

  it('started', () => {
    expect(transport.info).toBeInstanceOf(Object);
  });
});

describe('Database', () => {
  let dataSource: DataSource;
  let transport: Transport;

  beforeAll(async () => {
    transport = new Transport();
    dataSource = await AppDataSource.initialize();
  });

  afterAll(async () => {
    await dataSource.destroy();
  });

  it('find messags', async () => {
    const handler = new GetMessagesHandler(transport, StorageMethods.getMessages, dataSource);
    const res = await handler.onMessage();
    expect(res.messages).toHaveLength(5);
  });

  it('find message with id=1', async () => {
    const messageId = 2;
    const handler = new GetMessageByIdHandler(transport, StorageMethods.getMessages, dataSource);
    const res = await handler.onMessage({ id: messageId });

    expect(res).toEqual(expect.any(Object));
    expect(res).toHaveProperty('message');
    // .to.be.an('object').toHaveProperty('message')
    // .that.be.an('object').toHaveProperty('id', messageId);
  });
});
