import { CarDTO } from '../dtos/CarDTO';
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
  CardDetails: { carDTO: CarDTO };
  Scheduling: { carDTO: CarDTO };
  SchedulingDetails: { carDTO: CarDTO; dates:string[]};
  Confirmation: { confirmationDTO: ConfirmationDTO };
  MyCars: undefined;
}
