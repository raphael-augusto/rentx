import { RootStackParams } from "../routes/RootStackParams";

export  interface ConfirmationDTO {
  title: string;
  message: string;
  nextScreenRoute: keyof RootStackParams;
};
