import { DataSource } from 'typeorm';
import Transport from '@hibrain-trainee-nats/common/src/Transport';
import Handler from './Handler';

export default abstract class DBHandler extends Handler {
  readonly dataSource: DataSource;

  constructor(transport: Transport, subject: string, dataSource: DataSource) {
    super(transport, subject);
    this.dataSource = dataSource;
  }
}
