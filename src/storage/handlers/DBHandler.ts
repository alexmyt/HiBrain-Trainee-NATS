import { DataSource } from 'typeorm';
import Handler from './Handler';
import Transport from '../../common/Transport';

export default abstract class DBHandler extends Handler {
  readonly dataSource: DataSource;

  constructor(transport: Transport, subject: string, dataSource: DataSource) {
    super(transport, subject);
    this.dataSource = dataSource;
  }
}
