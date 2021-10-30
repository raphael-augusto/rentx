import React from "react";
import { createNativeStackNavigator, NativeStackNavigationProp } from '@react-navigation/native-stack';

import { Splash } from '../screens/Splash';
import { MyCars } from '../screens/MyCars';
import { Home } from '../screens/Home';
import { CardDetails } from '../screens/CardDetails';
import { Scheduling } from '../screens/Scheduling';
import { SchedulingDetails } from '../screens/SchedulingDetails';
import { Confirmation } from '../screens/Confirmation';
import { RootStackParams } from "./RootStackParams";

const { Navigator, Screen } = createNativeStackNavigator<RootStackParams>();
export type StackRouteProps =NativeStackNavigationProp<RootStackParams>

export function AppStackRoutes() {
  return(
    <Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="Home"
    >
      <Screen
        name="Splash"
        component={Splash}
      />
      <Screen
        name="Home"
        component={Home}
        options={{
          /** Don't go back to the home screen IOS*/
          gestureEnabled: false,
        }}
      />
      <Screen
        name="CardDetails"
        component={CardDetails}
      />
      <Screen
        name="Scheduling"
        component={Scheduling}
      />
      <Screen
        name="SchedulingDetails"
        component={SchedulingDetails}
      />
      <Screen
        name="Confirmation"
        component={Confirmation}
      />
      <Screen
        name="MyCars"
        component={MyCars}
      />
    </Navigator>

  );
};
