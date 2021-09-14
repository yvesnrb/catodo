import { createConnection, Connection } from 'typeorm';
import path from 'path';

import mongoConfig from '@config/mongo';

const database: Promise<Connection> = createConnection({
  type: 'mongodb',
  url: mongoConfig.url,
  database: mongoConfig.database,
  entities: [path.join(__dirname, 'modules/**/entities/*.{ts,js}')],
  useUnifiedTopology: true,
});

export default database;
