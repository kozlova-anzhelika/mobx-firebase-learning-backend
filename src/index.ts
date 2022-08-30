import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import express from 'express';
import { MongoClient } from 'mongodb';
import verifyEmailRouter from './routes/verifyEmail';
import { logger } from './utils/constants';

dotenv.config();

const mongo = new MongoClient(
  `mongodb://localhost:${process.env.REACT_APP_MONGO_PORT}/${process.env.REACT_APP_MONGO_DATA_BASE_NAME}`,
);
const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(verifyEmailRouter);

app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  res.status(500).json({
    message: err.message,
  });
  next();
});

async function start(): Promise<void> {
  try {
    await mongo.connect();
    app.listen(PORT, () => {
      console.log(`Server has been started on port ${PORT}`);
    });
  } catch (error) {
    logger(error);
  }
}

start();
