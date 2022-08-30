import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import verifyEmailRouter from './routes/verifyEmail';
import { logger } from './utils/constants';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const databaseUri = `mongodb://localhost:${process.env.REACT_APP_MONGO_PORT}/${process.env.REACT_APP_MONGO_DATA_BASE_NAME}`;

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
    await mongoose.connect(databaseUri);
    app.listen(PORT, () => {
      console.log(`Server has been started on port ${PORT}`);
    });
  } catch (error) {
    logger(error);
  }
}

start();
