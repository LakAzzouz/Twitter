import express, {Request, Response} from "express";
import 'dotenv/config';
import { twitterRouteur } from "./app/routes/twitter";

const app = express();
const port = 3005;

app.use(express.json());

app.use(twitterRouteur)

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})