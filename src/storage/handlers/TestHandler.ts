import { DataSource, FindOptionsWhere } from 'typeorm';
import Message from '../models/message';

export default async function findHandler(dataSource: DataSource, messageData?: unknown) {
  const messageRepo = dataSource.getRepository(Message);
  let where: FindOptionsWhere<Message> = {};
  if (typeof messageData === 'object') {
    where = Object.assign(where, messageData);
  }

  const messages = await messageRepo.find({ where });
  return { messages };
}
