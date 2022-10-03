/* eslint-disable no-console */
import { DataSource } from 'typeorm';
import Transport from '@hibrain-trainee-nats/common/src/Transport';
import { StorageMethods } from '@hibrain-trainee-nats/common/src/constants';
import AppDataSource from './data-source';
import GetMessagesHandler from './handlers/GetMessagesHandler';
import GetMessageByIdHandler from './handlers/GetMessageByIdHandler';

const transport = new Transport();
let dataSource: DataSource;

/**
 * Start microservice
 *
 * @export
 * @return {Promise<Transport>}
 */
export async function startService(): Promise<Transport> {
  dataSource = await AppDataSource.initialize();
  await transport.connect();

  new GetMessagesHandler(transport, StorageMethods.getMessages, dataSource).listen();
  new GetMessageByIdHandler(transport, StorageMethods.getMessagesById, dataSource).listen();

  return transport;
}

export async function stopService() {
  await transport.disconnect();
  await dataSource.destroy();
}
