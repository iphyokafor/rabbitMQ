import dotenv from "dotenv";
dotenv.config();
// import config from 'config'
import bodyParser from "body-parser";
import express, { Request, Response } from "express";

import createMQConsumer from "./consumer";

const PORT = 3001;
const AMQP_URL = String(process.env.AMQP_URL);
// config.get<string>('amqp_url')
const QUEUE_NAME = String(process.env.QUEUE_NAME);
// config.get<string>('queue_name')

const app = express();
const consumer = createMQConsumer(AMQP_URL, QUEUE_NAME);

consumer();
app.use(bodyParser.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World");
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
