import React from "react";

import { createNativeStackNavigator, NativeStackNavigationProp } from '@react-navigation/native-stack';

import { Home } from '../screens/Home';
import { CardDetails } from '../screens/CardDetails';
import { Scheduling } from '../screens/Scheduling';
import { SchedulingDetails } from '../screens/SchedulingDetails';
import { SchedulingComplete } from '../screens/SchedulingComplete';
import { MyCars } from '../screens/MyCars';
import { Splash } from '../screens/Splash';
import { RootStackParams } from "./RootStackParams";

const { Navigator, Screen } = createNativeStackNavigator<RootStackParams>();
export type StackRouteProps =NativeStackNavigationProp<RootStackParams>

export function StackRoutes() {
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
        name="SchedulingComplete"
        component={SchedulingComplete}
      />
      <Screen
        name="MyCars"
        component={MyCars}
      />
    </Navigator>

  );
};
