import express, { Request, Response } from "express";
import "dotenv/config";
import { accountRouter } from "./app/routes/account";
import { postRouter } from "./app/routes/post";
import { followRouter } from "./app/routes/follow";
import { spaceRouteur } from "./app/routes/space";

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
