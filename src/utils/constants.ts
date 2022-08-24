export const logger = (message: LogMessage): void => {
  message.isError ? console.error(new Error(message.text)) : console.log(message.text);
};

export const routes = {
  verifyEmail: '/verifyEmail',
};
