import { CarDTO } from '../dtos/CarDTO';

export type RootStackParams={
  Splash: undefined;
  Home: undefined;
  CardDetails: { carDTO: CarDTO };
  Scheduling: { carDTO: CarDTO };
  SchedulingDetails: {carDTO: CarDTO; dates:string[]};
  SchedulingComplete?: {carDTO: CarDTO; dates:string[]};
  MyCars: undefined;
}
