import React,{ useEffect, useState} from 'react';
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
import { useNetInfo } from '@react-native-community/netinfo';

import { database } from '../../database';
import { Car as ModelCar} from '../../database/model/Car';
import { BackButton } from '../../components/BackButton';
import { ImageSlider } from '../../components/ImageSlider';
import { Accessory } from '../../components/Accessory';
import { Button } from '../../components/Button';
import { getAccessoryIcon } from '../../utils/getAccessoryIcon';
import { RouteProp } from '@react-navigation/native';
import { RootStackParams } from '../../routes/RootStackParams';
import { CarDTO } from '../../dtos/CarDTO';
import { api } from '../../services/api';

import * as S from './styles';



type RoutesProps=RouteProp<RootStackParams, 'CardDetails'>

export function CardDetails(){
  const [car , setCar] = useState<ModelCar>({} as ModelCar);
  const [carUpdated, setCarUpdated] = useState<CarDTO>({} as CarDTO);
  const netInfo = useNetInfo()
  const navigation = useNavigation();
  const { params } = useRoute<RoutesProps>();
  const { carId } = params;
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
    navigation.navigate('Scheduling',{ carId });

  };

 function handleBackScreen() {
    navigation.goBack();
  };

  const getCarById = async (id: string) => {
    try{
      const carColletion = database.get<ModelCar>('cars');
      const cars = await carColletion.query().fetch();

      const findCar = cars.find(car => car.id === carId);

      if (!findCar) return;

      setCar(findCar);

    }catch(error){
      console.log(error);
    };
  };


  async function fetchCarUpdated() {
    const response = await api.get(`/cars/${carId}`);

    setCarUpdated(response.data);
  };

  useEffect(()=>{
    getCarById(carId);

    if(netInfo.isConnected === true){
      fetchCarUpdated();
    }
  },[netInfo.isConnected])

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
            <ImageSlider imagesUrl={
              !!carUpdated.photos ?
                carUpdated.photos : [{ id: "1", photo: car.thumbnail}]
            }/>
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
            <S.Brand>{ car.brand}</S.Brand>
            <S.Name>{car.name}</S.Name>
          </S.Description>

          <S.Rent>
            <S.Period>{car.period}</S.Period>
            <S.Price>R$ {netInfo.isConnected=== true ? car.price : '...'}</S.Price>
          </S.Rent>
        </S.Details>

        {
          carUpdated.accessories &&
          <S.Accessories>
          {
            carUpdated.accessories.map(accessory => (
              <Accessory
                key={accessory.type}
                name={accessory.name}
                icon={getAccessoryIcon(accessory.type)}
              />
            ))
          }
          </S.Accessories>
        }
        <S.About>{carUpdated.about}</S.About>
      </Animated.ScrollView>

      <S.Footer>
        <Button
          title="Escolher período do aluguel"
          onPress={handleConfirmScheduling}
          enabled={netInfo.isConnected === true}
        />

        {
          netInfo.isConnected === false &&
          <S.OfflineInfo>
            Conecte-se a Internert para ver mais detalhes e agendar seu carro.
          </S.OfflineInfo>
        }
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
