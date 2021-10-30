import React from "react";
import { createNativeStackNavigator, NativeStackNavigationProp } from '@react-navigation/native-stack';

import { Splash } from '../screens/Splash';
import { SignIn } from "../screens/SignIn";
import { SignUpFirstStep } from "../screens/SignUp/SignUpFirstStep";
import { SignUpSecondStep } from "../screens/SignUp/SignUpSecondStep";
import { Confirmation } from '../screens/Confirmation';
import { RootStackParams } from "./RootStackParams";

const { Navigator, Screen } = createNativeStackNavigator<RootStackParams>();
export type StackRouteProps =NativeStackNavigationProp<RootStackParams>

export function AuthRoutes() {
  return(
    <Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="Splash"
    >
      <Screen
        name="Splash"
        component={Splash}
      />
      <Screen
        name="SignIn"
        component={SignIn}
      />
      <Screen
        name="SignUpFirstStep"
        component={SignUpFirstStep}
      />
      <Screen
        name="SignUpSecondStep"
        component={SignUpSecondStep}
      />
      <Screen
        name="Confirmation"
        component={Confirmation}
      />
    </Navigator>

  );
};
