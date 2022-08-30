interface LogMessage {
  text: string;
  isError?: boolean;
}

declare interface UserDocument extends Document {
  email: string;
  name?: string;
  confirmationCode?: string;
}
