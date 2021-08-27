import React, { useState, useEffect } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Alert } from 'react-native';
import { format } from 'date-fns';
import { Feather } from '@expo/vector-icons';
import { RFValue } from 'react-native-responsive-fontsize';
import { useTheme } from 'styled-components';



import speedSvg from '../../assets/speed.svg';
import acceleration from '../../assets/acceleration.svg';
import force from '../../assets/force.svg';
import gasoline from '../../assets/gasoline.svg';
import exchange from '../../assets/exchange.svg';
import people from '../../assets/people.svg';

import { api } from '../../services/api';
import { getPlatformDate } from '../../utils/getPlatformDate';
import { getAccessoryIcon } from '../../utils/getAccessoryIcon';
import { BackButton } from '../../components/BackButton';
import { ImageSlider } from '../../components/ImageSlider';
import { Accessory } from '../../components/Accessory';
import { Button } from '../../components/Button';

import { CarDTO } from '../../dtos/CarDTO';

import * as S from './styles';


interface Params {
  car: CarDTO;
  dates: string[];
}

type NavigationProps = {
  navigate: (screen:string) => void;
  goBack: () => void;
}

interface RentalPeriod {
  startFormatted: string;
  endFormatted: string;
}


export function SchedulingDetails(){
  const [rentalPeriod, setRentalPeriod] = useState<RentalPeriod>( {} as RentalPeriod );

  const navigation = useNavigation<NavigationProps>();
  const route = useRoute();
  const { car, dates } = route.params as Params;

  const theme = useTheme();

  async function handleConfirm() {
    const shedulesByCar = await api.get(`/schedules_bycars/${car.id}`);
    const unavailable_dates = [
      ...shedulesByCar.data.unavailable_dates,
      ...dates,
    ];

    /** ADD  DATE CAR */
    api.put(`/schedules_bycars/${car.id}`,{
      id: car.id,
      unavailable_dates
    })
    .then(() => {navigation.navigate('SchedulingComplete')})
    .catch(() => Alert.alert('Não foi possível confirmar o agendamento.'));
  }

  function handleBackScreen() {
    navigation.goBack();
  }

  const rentTotal = Number(dates.length * car.rent.price)

  useEffect(()=>{
    setRentalPeriod({
      startFormatted: format(getPlatformDate(new Date(dates[0])), 'dd/MM/yyyy'),
      endFormatted: format(getPlatformDate(new Date(dates[dates.length -1])), 'dd/MM/yyyy'),
    })
  },[]);

  return (
    <S.Container>
      <S.Header>
        <BackButton onPress={handleBackScreen} />
      </S.Header>

      <S.CarImages>
        <ImageSlider imagesUrl={car.photos}/>
      </S.CarImages>

      <S.Content>
        <S.Details>
          <S.Description>
            <S.Brand>{car.brand}</S.Brand>
            <S.Name>{car.name}</S.Name>
          </S.Description>

          <S.Rent>
            <S.Period>{car.rent.period}</S.Period>
            <S.Price>R$ {car.rent.price}</S.Price>
          </S.Rent>
        </S.Details>

        <S.Accessories>
        {
          car.accessories.map(accessory => (
            <Accessory
              key={accessory.type}
              name={accessory.name}
              icon={getAccessoryIcon(accessory.type)}
            />
          ))
        }
        </S.Accessories>

        <S.RentalPeriod>
          <S.CalendarIcon>
            <Feather
              name="calendar"
              size={RFValue(24)}
              color={theme.colors.shape}
            />
          </S.CalendarIcon>

          <S.DateInfo>
            <S.DateTitle>DE</S.DateTitle>
            <S.DateValue>{rentalPeriod.startFormatted}</S.DateValue>
          </S.DateInfo>

          <Feather
              name="chevron-right"
              size={RFValue(10)}
              color={theme.colors.shape}
          />

          <S.DateInfo>
            <S.DateTitle>ATÉ</S.DateTitle>
            <S.DateValue>{rentalPeriod.endFormatted}</S.DateValue>
          </S.DateInfo>
        </S.RentalPeriod>

        <S.RentalPrice>
          <S.RentalPriceLabel>TOTAL</S.RentalPriceLabel>

          <S.RentalPriceDetails>
            <S.RentalPriceQuota>{`R$ ${car.rent.price}  x${dates.length} diárias`}</S.RentalPriceQuota>
            <S.RentalPriceTotal>R$ {rentTotal}</S.RentalPriceTotal>
          </S.RentalPriceDetails>
        </S.RentalPrice>
      </S.Content>

      <S.Footer>
        <Button
          title="Alugar agora"
          color={theme.colors.success}
          onPress={handleConfirm}
        />
      </S.Footer>
    </S.Container>
  );
};
