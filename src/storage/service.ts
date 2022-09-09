/* eslint-disable no-console */
import { JSONCodec } from 'nats';
import { DataSource } from 'typeorm';
import Transport from '../common/Transport';
import { StorageMethods } from '../common/constants';
import findHandler from './handlers/TestHandler';
import AppDataSource from './data-source';

const dataCodec = JSONCodec();
const transport = new Transport();
let dataSource: DataSource;

async function subscribe(subject: string) {
  const sub = transport.subscribe(subject);

  console.log(`Storage listening for ${sub.getSubject()} requests...`);
  // eslint-disable-next-line no-restricted-syntax
  for await (const message of sub) {
    const messageData = dataCodec.decode(message.data);
    console.log(`[${sub.getProcessed()} ${sub.getSubject()}]: ${messageData}`);
    const respond = await findHandler(dataSource, messageData);
    message.respond(dataCodec.encode(respond));
  }
  console.log(`Storage subscription for ${sub.getSubject()} closed`);
}

/**
 * Start microservice
 *
 * @export
 * @return {Promise<Transport>}
 */
export async function startService(): Promise<Transport> {
  dataSource = await AppDataSource.initialize();
  await transport.connect();

  Object.values(StorageMethods).forEach((method) => {
    subscribe(method);
  });

  return transport;
}

export async function stopService() {
  await transport.disconnect();
  await dataSource.destroy();
}
