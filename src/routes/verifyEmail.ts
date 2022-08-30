import { Request, Response, Router } from 'express';
import { routes, errorMessages, logger } from '../utils/constants';
import User from '../models/user';

const verifyEmailRouter = Router();

const generateConfirmationCode = (): number => {
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

  const confirmationCode = generateConfirmationCode();

  try {
    const user = await User.findOneAndUpdate(
      { email: req.body.email },
      {
        $set: {
          confirmationCode,
        },
      },
    );
    if (!user) {
      const newUser = new User({
        email: req.body.email,
        confirmationCode,
      });
      await newUser.save();
    }
    res.status(200).json({
      message: 'ok',
    });
  } catch (error) {
    logger(error.message);
  }
});

export default verifyEmailRouter;
