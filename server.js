const mongoose = require('mongoose');

process.on('uncaughtException', (err) => {
  console.log(`\x1b[93m${err.name}\x1b[0m`, err.message);
  console.log(`\x1b[31mUNCAUGHT EXCEPTION! 💥 Shutting Down...\x1b[0m`);
  process.exit(1);
});

// Environment Variables
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD,
);

mongoose.connect(DB).then((con) => {
  // console.log(con.connections);
  console.log('\x1b[35mDB connection successful!\x1b[0m');
});
const app = require('./app');

const port = process.env.PORT || 3000;

const server = app.listen(port, () => {
  // console.log(`App running on port ${port}...`);
  console.log(`\x1b[34mApp running on port 3000...\x1b[0m`);
});

// handled error outside express like mongoose error
process.on('unhandledRejection', (err) => {
  console.log(`\x1b[93m${err.name}\x1b[0m`, err.message);
  console.log(`\x1b[31mUNHANDLED REJECTION! 💥 Shutting Down...\x1b[0m`);
  server.close(() => {
    process.exit(1);
  });
});
