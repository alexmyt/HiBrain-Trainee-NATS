/* eslint-disable no-undef */
import 'dotenv/config';
import { expect } from 'chai';
import { DataSource } from 'typeorm';
import { startService, stopService } from '../packages/storage/src/service';
import Transport from '../packages/common/src/Transport';
import AppDataSource from '../packages/storage/src/data-source';
import { StorageMethods } from '../packages/common/src/constants';
import GetMessagesHandler from '../packages/storage/src/handlers/GetMessagesHandler';
import GetMessageByIdHandler from '../packages/storage/src/handlers/GetMessageByIdHandler';

describe('Storage service', () => {
  let transport: Transport;

  before(async () => {
    transport = await startService();
  });

  after(async () => {
    await stopService();
  });

  it('started', () => {
    expect(transport.info).to.be.an('object');
  });
});

describe('Database', () => {
  let dataSource: DataSource;
  let transport: Transport;

  before(async () => {
    transport = new Transport();
    dataSource = await AppDataSource.initialize();
  });

  after(async () => {
    await dataSource.destroy();
  });

  it('find messags', async () => {
    const handler = new GetMessagesHandler(transport, StorageMethods.getMessages, dataSource);
    const res = await handler.onMessage();
    expect(res)
      .to.be.an('object')
      .with.property('messages')
      .that.be.an('array')
      .with.length.gte(3);
  });

  it('find message with id=1', async () => {
    const messageId = 2;
    const handler = new GetMessageByIdHandler(transport, StorageMethods.getMessages, dataSource);
    const res = await handler.onMessage({ id: messageId });
    expect(res)
      .to.be.an('object')
      .with.property('message')
      .that.be.an('object')
      .with.property('id', messageId);
  });
});
