import DBHandler from './DBHandler';
import Message from '../models/message';

export default class GetMessageByIdHandler extends DBHandler {
  async onMessage(msg: {id: number | string}) {
    const messageRepo = this.dataSource.getRepository(Message);

    const id = typeof msg.id === 'string'
      ? +msg.id
      : msg.id;

    const message = await messageRepo.findOneBy({ id });
    return { message };
  }
}
