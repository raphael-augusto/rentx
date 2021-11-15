import React, { useEffect, useState }from 'react';
import {  useNavigation } from '@react-navigation/native';
import { StatusBar,  BackHandler} from 'react-native';
import { useNetInfo } from '@react-native-community/netinfo';
import { synchronize } from '@nozbe/watermelondb/sync';
import { database } from '../../database';

import { api } from '../../services/api';
import { Header } from '../../components/Header';
import { Car } from '../../components/Car';
import { Load } from '../../components/Load';
import { Car as ModelCar} from '../../database/model/Car';


import * as S from './styles';

/** Component Button My Cars */
//const ButtonAnimated = Animated.createAnimatedComponent(RectButton);

export function Home(){
  const [cars, setCars] = useState<ModelCar[]>([]);
  const [loading, setLoading] = useState(true);
  const netInfo = useNetInfo();
  const navigation = useNavigation();

  async function handleCarDetails(carId: string) {
    navigation.navigate('CardDetails', {carId});
  };

  async function offlineSynchronize() {
    await synchronize({
      database,
      pullChanges: async ({ lastPulledAt }) => {
        const response = await api.get(`cars/sync/pull?lastPulledVersion=${lastPulledAt || 0}`);
        const { changes, latestVersion } = response.data;

        return { changes, timestamp:latestVersion };
      },
      pushChanges: async ({ changes }) => {
        const user = changes.users;
        await api.post('/users/sync', user).catch(console.log);
      },
    });
  }

  useEffect(()=>{
    let isMounted = true;

    const fetchCars = async () => {
      try{
        const carColletion = database.get<ModelCar>('cars');
        const cars = await carColletion.query().fetch();

        if(isMounted){
          setCars(cars);
        };

      }catch(error){
        console.log(error);
      }finally{
        if (isMounted) {
          setLoading(false);
        };
      }
    };

    fetchCars();
    /* Clean function */
    return () => {
      isMounted = false;
    };
  },[]);

  /** Don't go back to the home screen Android*/
  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', () =>{
      return true;
    })
  },[]);

  useEffect(() => {
    if (netInfo.isConnected === true) {
      offlineSynchronize();
    };

  },[netInfo.isConnected]);

  /** Component Animation Exemple

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

  function handleMyCars() {
    navigation.navigate('MyCars');
  };
  */

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
              <Car data={item} onPress={() => handleCarDetails(item.id)}/>
            }
          />
      }
      {/* <PanGestureHandler onGestureEvent={onGestureEvent}>
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
      </PanGestureHandler> */}
    </S.Container>
  );
};

// const styles = StyleSheet.create({
//   button: {
//     width: 60,
//     height: 60,
//     borderRadius: 30,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
// })
