import express from "express";
import { accountRouter } from "./app/routes/account";
import { postRouter } from "./app/routes/post";
import { followRouter } from "./app/routes/follow";
import { spaceRouteur } from "./app/routes/space";
import knex from "knex";
import "dotenv/config";

export const db = knex({
  client: "mysql",
  connection: {
    host: "127.0.0.1",
    port: 3306,
    user: "root",
    password: "",
    database: "TWITTER",
  },
});

console.log("Connection db ok");

const app = express();
const port = 3005;

app.use(express.json());

app.use("/accounts", accountRouter);
app.use(postRouter);
app.use(followRouter);
app.use(spaceRouteur);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
