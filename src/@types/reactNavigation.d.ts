import { RootStackParams } from '../routes/RootStackParams';

declare global {
  namespace ReactNavigation{
    interface RootParamList extends RootStackParams {}
  }
}
