import { UserDTO } from '../dtos/UserDTO';
import { ConfirmationDTO } from '../dtos/ConfirmationDTO';

export type RootStackParams={
  Splash: undefined;
  SignIn: undefined;
  SignUpFirstStep: undefined;
  SignUpSecondStep: { userDTO: UserDTO };
  Home: undefined;
  Profile: undefined;
  App: undefined;
  CardDetails: { carId: string };
  Scheduling: { carId: string  };
  SchedulingDetails: { carId: string; dates:string[]};
  Confirmation: { confirmationDTO: ConfirmationDTO };
  MyCars: undefined;
}
