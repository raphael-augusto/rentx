import React, { useEffect, useState }from 'react';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { StatusBar, StyleSheet, BackHandler } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from 'styled-components';
import Animated,{
  useSharedValue,
  useAnimatedStyle,
  useAnimatedGestureHandler,
  withSpring
} from 'react-native-reanimated';
import { RectButton, PanGestureHandler } from 'react-native-gesture-handler';

import { api } from '../../services/api';
import { CarDTO } from '../../dtos/CarDTO';
import { Header } from '../../components/Header';
import { Car } from '../../components/Car';
import { Load } from '../../components/Load';


import * as S from './styles';


/** Component Button My Cars */
const ButtonAnimated = Animated.createAnimatedComponent(RectButton);

// type RoutesProps=RouteProp<RootStackParams, 'Home'>

export function Home(){
  const [cars, setCars] = useState<CarDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  const theme = useTheme();

  const positionY = useSharedValue(0);
  const positionX = useSharedValue(0);

  const myCarButtonStyle = useAnimatedStyle(() => {
    return{
      transform: [
        { translateX: positionX.value },
        { translateY: positionY.value },
      ],
    }
  });

  const onGestureEvent = useAnimatedGestureHandler({
    onStart( _, ctx: any){
      ctx.positionX = positionX.value;
      ctx.positionY = positionY.value;
    },
    onActive(event, ctx: any){
      positionX.value = ctx.positionX + event.translationX;
      positionY.value = ctx.positionY + event.translationY;
    },
    onEnd(){
      positionX.value = withSpring(0);
      positionY.value = withSpring(0);
    }
  });

  function handleCarDetails(car: CarDTO) {
    navigation.navigate('CardDetails', { carDTO: car });
  };

  function handleMyCars() {
    navigation.navigate('MyCars');
  };

  useEffect(()=>{
    const fetchCars = async () => {
      try{
        const response = await api.get('/cars');

        setCars(response.data);
      }catch(error){
        console.log(error);
      }finally{
        setLoading(false);
      }
    };

    fetchCars();
  },[]);

  /** Don't go back to the home screen Android*/
  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', () =>{
      return true;
    })
  },[]);

  return (
    <S.Container >
      <StatusBar
        barStyle='light-content'
        /** android */
        backgroundColor="transparent"
        translucent
      />

      { !loading && <Header title={`Total de ${cars.length} carros`} /> }

      {
        loading
        ? <Load />
        : <S.CardList
            data={cars}
            keyExtractor={item => item.id}
            renderItem={({item}) =>
              <Car data={item} onPress={()=>handleCarDetails(item)}/>
            }
          />
      }
      <PanGestureHandler onGestureEvent={onGestureEvent}>
        <Animated.View style={[
          myCarButtonStyle,
          {
            position: 'absolute',
            bottom: 13,
            right: 22
          }
        ]}>
          <ButtonAnimated
            onPress={handleMyCars}
            style={[styles.button, {backgroundColor: theme.colors.main}]}
          >
            <Ionicons
              name="ios-car-sport"
              size={32}
              color={theme.colors.shape}
            />
          </ButtonAnimated>
        </Animated.View>
      </PanGestureHandler>
    </S.Container>
  );
};

const styles = StyleSheet.create({
  button: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
})
