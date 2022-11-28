import dotenv from "dotenv";
dotenv.config();
// import config from 'config';
import bodyParser from "body-parser";
import express, { Request, Response } from "express";

import createMQProducer from "./producer";

const PORT = 3000;
const AMQP_URL = String(process.env.AMQP_URL);
// config.get<string>('amqp_url')
const QUEUE_NAME = String(process.env.QUEUE_NAME);
// config.get<string>('queue_name')

const app = express();
const producer = createMQProducer(AMQP_URL, QUEUE_NAME);

app.use(bodyParser.json());

app.post("/register", (req: Request, res: Response) => {
  const { email, password } = req.body;
  console.log("Registering user...");
  const msg = {
    action: "REGISTER",
    data: { email, password },
  };
  producer(JSON.stringify(msg));

  return res.send("OK");
});

app.post("/login", (req: Request, res: Response) => {
  const { email, password } = req.body;
  console.log("Login user...");
  const msg = {
    action: "LOGIN",
    data: { email, password },
  };
  producer(JSON.stringify(msg));

  return res.send("OK");
});

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World");
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
