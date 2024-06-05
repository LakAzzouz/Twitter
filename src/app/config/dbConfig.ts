import knex from "knex";

const dbConfig = knex({
    client: "mysql",
    connection: {
      host: "127.0.0.1",
      port: 3306,
      user: "root",
      password: "password",
      database: "TWITTER",
    },
  });
  

export default dbConfig 