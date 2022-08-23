import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import express from 'express';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  res.status(500).json({
    message: err.message,
  });
  next();
});

async function start(): Promise<void> {
  app.listen(PORT, () => {
    console.log(`Server has been started on port ${PORT}`);
  });
}

start();
