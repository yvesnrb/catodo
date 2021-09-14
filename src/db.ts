import { createConnection, Connection } from 'typeorm';

import mongoConfig from '@config/mongo';

const database: Promise<Connection> = createConnection({
  type: 'mongodb',
  url: mongoConfig.url,
  database: mongoConfig.database,
});

export default database;
