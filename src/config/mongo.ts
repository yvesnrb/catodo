export default {
  url: process.env.MONGO_URL || 'mongodb://mongo:mongo@localhost:27017',
  database: process.env.MONGO_DATABASE || 'catodo',
};
