import knex from "knex";

export const dbTest = knex({
    client: "mysql",
    connection: {
      host: "localhost",
      port: 3306,
      user: "root",
      password: "password",
      database: "TWITTER",
    },
  });
  
  console.log("Connection db ok");