/* eslint-disable no-console */
import 'dotenv/config';
import 'reflect-metadata';

import database from '@/db';
import serverConfig from '@config/server';

database.then(async () => {
  console.log('MongoDB connected.');
  const server = await import('@http/server');

  server.default.listen(serverConfig.port, () => {
    console.log(`Server listening on port ${serverConfig.port}.`);
  });
}).catch((reason) => {
  console.log('MongoDB connection failed.');
  console.log(reason);
});
