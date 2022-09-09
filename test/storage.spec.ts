/* eslint-disable no-undef */
import 'dotenv/config';
import { expect } from 'chai';
import { DataSource } from 'typeorm';
import { startService, stopService } from '../src/storage/service';
import Transport from '../src/common/Transport';
import findHandler from '../src/storage/handlers/TestHandler';
import AppDataSource from '../src/storage/data-source';

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

  before(async () => {
    dataSource = await AppDataSource.initialize();
  });

  after(async () => {
    await dataSource.destroy();
  });

  it('find messags', async () => {
    const res = await findHandler(dataSource);
    expect(res)
      .to.be.an('object')
      .with.property('messages')
      .that.be.an('array')
      .with.length.gte(3);
  });

  it('find message with id=1', async () => {
    const res = await findHandler(dataSource, { id: 1 });
    expect(res)
      .to.be.an('object')
      .with.property('messages')
      .that.be.an('array')
      .with.length(1);
  });
});
