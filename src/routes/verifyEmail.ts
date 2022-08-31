import { Request, Response, Router } from 'express';
import { routes, errorMessages, logger, emailSubjects } from '../utils/constants';
import User from '../models/user';
import sendMessage from '../utils/mailer';

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

  const { email } = req.body;
  const confirmationCode = generateConfirmationCode();

  try {
    const user = await User.findOneAndUpdate(
      { email },
      {
        $set: {
          confirmationCode,
        },
      },
    );
    if (!user) {
      const newUser = new User({
        email,
        confirmationCode,
      });
      await newUser.save();
    }

    await sendMessage(email, emailSubjects.confirmationCode, confirmationCode.toString());

    res.status(200).json({
      message: 'ok',
    });
  } catch (error) {
    res.status(500).json({
      message: errorMessages.common,
    });
    logger({
      text: error.message,
    });
  }
});

export default verifyEmailRouter;
