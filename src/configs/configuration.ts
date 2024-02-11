import * as env from 'dotenv';
env.config();
export default () => ({
  database: {
    mongo: process.env.MONGO_URI,
  },
  cache: {
    host: process.env.REDIS_HOST,
    port: +process.env.REDIS_PORT,
  },
});
