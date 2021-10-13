import React, { useState, useEffect } from 'react';
import { StatusBar, FlatList } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons'
import { useTheme } from 'styled-components';

import { api } from '../../services/api';
import { CarDTO } from '../../dtos/CarDTO';
import { BackButton } from '../../components/BackButton';
import { Car } from '../../components/Car';
import { Load } from '../../components/Load';

import * as S from './styles';

type NavigationProps = {
  goBack: () => void;
}

interface CarProps {
  id: string;
  user_id: string;
  car: CarDTO;
  startDate: string;
  endDate: string;
}

export function MyCars(){
  const [cars, setCars] = useState<CarProps[]>([]);
  const [loading, setLoading] = useState(true);

  const navigation = useNavigation<NavigationProps>();
  const route = useRoute();

  const theme = useTheme();

  /**LIST - CARS USER */
  useEffect(()=>{
    async function fetchCars() {
      try {
        const response = await api.get('/schedules_byuser?user_id=1');
        setCars(response.data);

      } catch (error) {
        console.log(error);
      }finally{
        setLoading(false);
      }
    }

    fetchCars();
  },[]);

  function handleBackScreen() {
    navigation.goBack();
  }

  return (
    <S.Container>
      <S.Header>
        <StatusBar
          barStyle="light-content"
          translucent
          backgroundColor="transparent"
        />
        <BackButton
          onPress={handleBackScreen}
          color={theme.colors.shape}
        />

        <S.Title>
          Escolha uma {'\n'}
          data de início e {'\n'}
          fim do aluguel
        </S.Title>

        <S.SubTitle>
          Conforto, segurança e praticidade.
        </S.SubTitle>
      </S.Header>
      { loading ?
        <Load /> :
        <S.Content>
          <S.Appointments>
            <S.AppointmentsTitle>Agendamentos feitos</S.AppointmentsTitle>
            <S.AppointmentsQuantity>{cars.length}</S.AppointmentsQuantity>
          </S.Appointments>

          <FlatList
            data={cars}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            renderItem={({item}) => (
              <S.CarWrapper>
                <Car data={item.car} />
                <S.CarFooter>
                  <S.CarFooterTitle>Periodo</S.CarFooterTitle>
                  <S.CarFooterPeriod>
                    <S.CarFooterDate>{item.startDate}</S.CarFooterDate>
                    <AntDesign
                      name='arrowright'
                      size={20}
                      color={theme.colors.title}
                      style={{ marginHorizontal: 10 }}
                    />
                    <S.CarFooterDate>{item.endDate}</S.CarFooterDate>
                  </S.CarFooterPeriod>
                </S.CarFooter>
              </S.CarWrapper>
            )}
          />
      </S.Content>
      }
    </S.Container>
  );
};
