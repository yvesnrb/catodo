/* eslint-disable no-console */
import 'dotenv/config';
import 'reflect-metadata';
import database from '@/db';

database.then(() => {
  console.log('MongoDB connected.');
}).catch((reason) => {
  console.log('MongoDB connection failed.');
  console.log(reason);
});
