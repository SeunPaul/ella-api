const knex = require("knex");

const db = knex({
  client: "pg",
  connection: {
    host: "localhost",
    database: "ella",
    user: "seun",
    password: "0030335"
  }
  // {
  //   connectionString: process.env.DATABASE_URL,
  //   ssl: {
  //     rejectUnauthorized: false
  //   }
  // }
});

module.exports = db;
