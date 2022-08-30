import { Request, Response, Router } from 'express';
import { routes, errorMessages } from '../utils/constants';

const verifyEmailRouter = Router();

const generateVerificationCode = (): number => {
  const minValue = 1000;
  const maxValue = 9999;

  return Math.floor(Math.random() * (maxValue - minValue + 1) + minValue);
};

verifyEmailRouter.post(routes.verifyEmail, async (req: Request, res: Response) => {
  if (!req.body.email) {
    res.status(400).json({
      message: errorMessages.incompleteReqData,
    });
  }
  const varificationCode = generateVerificationCode();
  console.log(varificationCode);
});

export default verifyEmailRouter;
