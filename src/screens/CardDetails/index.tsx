import React from 'react';
import { StatusBar , StyleSheet} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { useTheme } from 'styled-components';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue
} from 'react-native-reanimated';

import { BackButton } from '../../components/BackButton';
import { ImageSlider } from '../../components/ImageSlider';
import { Accessory } from '../../components/Accessory';
import { Button } from '../../components/Button';
import { getAccessoryIcon } from '../../utils/getAccessoryIcon';
import { RouteProp } from '@react-navigation/native';
import { RootStackParams } from '../../routes/RootStackParams';

import * as S from './styles';

type RoutesProps=RouteProp<RootStackParams, 'CardDetails'>

export function CardDetails(){
  const navigation = useNavigation();
  const { params } = useRoute<RoutesProps>();
  const { carDTO } = params;
  const theme = useTheme();

  const scrollY = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler(event => {
    scrollY.value = event.contentOffset.y;
  });

  const headerStyleAnimated = useAnimatedStyle(() => {
    return {
      height: interpolate(
        scrollY.value,
        [0,200],
        [200,70],
        Extrapolate.CLAMP
      ),
    }
  });

  const sliderCarsStyleAnimation = useAnimatedStyle(() => {
    return {
      opacity: interpolate(
        scrollY.value,
        [0, 150],
        [1, 0],
        Extrapolate.CLAMP
      ),
    }
  });

  function handleConfirmScheduling() {
    navigation.navigate('Scheduling',{carDTO});
  };

 function handleBackScreen() {
    navigation.goBack();
  };


  return (
    <S.Container>
      <StatusBar
        barStyle="dark-content"
        translucent
        backgroundColor="transparent"
      />

      <Animated.View
        style={[
          headerStyleAnimated,
          styles.header,
          {backgroundColor: theme.colors.background_secondary
        }]}
      >
        <Animated.View
          style={sliderCarsStyleAnimation}
        >
          <S.Header>
            <BackButton onPress={handleBackScreen}/>
          </S.Header>

          <S.CarImages>
            <ImageSlider imagesUrl={carDTO.photos}/>
          </S.CarImages>
        </Animated.View>
      </Animated.View>

      <Animated.ScrollView
         contentContainerStyle= {{
          paddingHorizontal: 24,
          paddingTop: getStatusBarHeight() + 160,
        }}
        showsVerticalScrollIndicator={false}
        onScroll={scrollHandler}
        scrollEventThrottle={16}
      >
        <S.Details>
          <S.Description>
            <S.Brand>{carDTO.brand}</S.Brand>
            <S.Name>{carDTO.name}</S.Name>
          </S.Description>

          <S.Rent>
            <S.Period>{carDTO.rent.period}</S.Period>
            <S.Price>R$ {carDTO.rent.price}</S.Price>
          </S.Rent>
        </S.Details>

        <S.Accessories>
        {
          carDTO.accessories.map(accessory => (
            <Accessory
              key={accessory.type}
              name={accessory.name}
              icon={getAccessoryIcon(accessory.type)}
            />
          ))
        }
        </S.Accessories>

        <S.About>{carDTO.about}</S.About>
      </Animated.ScrollView>

      <S.Footer>
        <Button title="Escolher período do aluguel" onPress={handleConfirmScheduling}/>
      </S.Footer>
    </S.Container>
  );
};


const styles = StyleSheet.create({
  header: {
    position: 'absolute',
    overflow: 'hidden',
    zIndex: 1,
  }
})
