import React, { useEffect, useState }from 'react';
import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from 'styled-components';

import { api } from '../../services/api';
import { CarDTO } from '../../dtos/CarDTO';
import { Header } from '../../components/Header';
import { Car } from '../../components/Car';
import { Load } from '../../components/Load';
import {ConfirmButton} from '../../components/ConfirmButton'

import * as S from './styles';

interface Params {
  car: CarDTO;
}

type NavigationProps = {
  navigate: (screen: string, params: Params) => void;
  goBack: () => void;
}

export function Home(){
  const [cars, setCars] = useState<CarDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation<NavigationProps>();
  const theme = useTheme()

  function handleCarDetails(car: CarDTO) {
    navigation.navigate('CardDetails', { car });
  }

  function handleMyCars() {
    navigation.navigate('MyCars', { });
  }

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

  return (
    <S.Container >
      <StatusBar
        barStyle='light-content'
        /** android */
        backgroundColor="transparent"
        translucent
      />
      <Header title="Total de carros 12 carros"/>
      {loading
      ? <Load />
      : <S.CardList
          data={cars}
          keyExtractor={item => item.id}
          renderItem={({item}) =>
            <Car data={item} onPress={()=>handleCarDetails(item)}/>
          }
        />
      }

      <S.MyCarsButton onPress={handleMyCars}>
        <Ionicons
          name="ios-car-sport"
          size={32}
          color={theme.colors.shape}
        />
      </S.MyCarsButton>
    </S.Container>
  );
};
