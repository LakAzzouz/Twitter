import express, {Request, Response} from "express";
import 'dotenv/config';
import { accountRouter, followRouter, postRouter, spaceRouteur } from "./app/routes/twitter";

const app = express();
const port = 3005;

app.use(express.json());

app.use(accountRouter)
app.use(postRouter)
app.use(followRouter)
app.use(spaceRouteur)


app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})