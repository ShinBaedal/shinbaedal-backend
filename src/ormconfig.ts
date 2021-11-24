import 'dotenv/config';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { ConnectionOptions } from 'typeorm';

export const connectionOption: ConnectionOptions = {
  type: 'mysql',
  host: process.env.PROD_DB_HOST,
  port: +process.env.PROD_DB_PORT,
  username: process.env.PROD_DB_USERNAME,
  password: process.env.PROD_DB_PASSWORD,
  database: process.env.PROD_DB_DATABASE,
  synchronize: false,
  logging: false,
  namingStrategy: new SnakeNamingStrategy(),
};
