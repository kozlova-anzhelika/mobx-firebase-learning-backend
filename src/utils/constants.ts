export const logger = (message: LogMessage): void => {
  message.isError ? console.error(new Error(message.text)) : console.log(message.text);
};

export const routes = {
  verifyEmail: '/verifyEmail',
};

export const errorMessages = {
  common: 'Error. Try again',
  incompleteReqData: 'Error. Data for saving hasn`t been transferred.',
};
