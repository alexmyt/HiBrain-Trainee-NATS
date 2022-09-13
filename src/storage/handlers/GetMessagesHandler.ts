import DBHandler from './DBHandler';
import Message from '../models/message';

export default class GetMessagesHandler extends DBHandler {
  async onMessage() {
    const messageRepo = this.dataSource.getRepository(Message);
    const messages = await messageRepo.find();
    return { messages };
  }
}
