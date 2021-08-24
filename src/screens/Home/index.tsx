import React, { useEffect, useState }from 'react';
import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'react-native';

import { api } from '../../services/api';
import { CarDTO } from '../../dtos/CarDTO';
import { Header } from '../../components/Header';
import { Car } from '../../components/Car';
import { Load } from '../../components/Load';

interface Params {
  car: CarDTO;
}

type NavigationProps = {
  navigate: (screen: string, params: Params) => void;
}

import * as S from './styles';

export function Home(){
  const [cars, setCars] = useState<CarDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation<NavigationProps>();

  function handleCarDetails(car: CarDTO) {
    navigation.navigate('CardDetails', { car });
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

    </S.Container>
  );
};
