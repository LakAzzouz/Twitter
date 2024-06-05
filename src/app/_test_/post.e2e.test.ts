import express from "express"

const app = express()

describe("E2E - Follow", () => {
    let followRepository: 
    let authorization
    
      beforeAll(async () => {
        app.use(express.json());
        app.use();
    
        const db = knex({
          client: "mysql",
          connection: {
            host: "127.0.0.1",
            port: 3306,
            user: "root",
            password: "",
            database: "TWITTER",
          },
        });
    