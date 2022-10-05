import { DataSource } from 'typeorm';
import Message from './models/message';

const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || '0.0.0.0',
  port: process.env.DB_PORT !== undefined ? +process.env.DB_PORT : 5432,
  username: process.env.DB_USER || 'test',
  password: process.env.DB_PWD || 'test',
  database: process.env.DB_NAME || 'test',
  synchronize: true,
  // logging: ['error'],
  entities: [Message],
  subscribers: [],
  migrations: [],
});

export default AppDataSource;
