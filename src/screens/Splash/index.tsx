import React, { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import Animated, { useSharedValue, useAnimatedStyle, withTiming, interpolate, Extrapolate, runOnJS} from 'react-native-reanimated';
import BrandSvg from '../../assets/brand.svg';
import LogoPng from '../../assets/logo.svg';


import * as S from './styles';



export function Splash(){
  const splashAnimation = useSharedValue(0);
  const navigation = useNavigation();

  const brandStyle = useAnimatedStyle(() => {
    return{
      opacity: interpolate( splashAnimation.value,
        [0, 50],
        [1, 0],
      ),
      transform: [{
        translateX: interpolate( splashAnimation.value,
          [0, 50],
          [0, -50],
          Extrapolate.CLAMP
        )
      }],
    }
  });

  const logoStyle = useAnimatedStyle(() => {
    return{
      opacity: interpolate( splashAnimation.value,
        [0, 25, 50],
        [0, .3, 1],
      ),
      transform: [{
        translateX: interpolate( splashAnimation.value,
          [0, 50],
          [-50, 0],
          Extrapolate.CLAMP
        )
      }],
    }
  });

  function startApp() {
    navigation.navigate('SignIn');
  }

  useEffect(()=>{
    splashAnimation.value = withTiming(
      50,
      { duration: 2000 },
      () => {
        'worklet'//redirecting stream to home
        runOnJS(startApp)();
      }
    );
  },[]);

  return (
    <S.Container>
      <Animated.View style={[brandStyle, {position: 'absolute'}]}>
        <BrandSvg width={80} height={50}/>
      </Animated.View>

      <Animated.View style={[logoStyle, {position: 'absolute'}]}>
        <LogoPng width={180} height={20}/>
      </Animated.View>
    </S.Container>
  );
};

