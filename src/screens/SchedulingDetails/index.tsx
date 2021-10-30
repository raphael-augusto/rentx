import React, { useState, useEffect } from 'react';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { Alert } from 'react-native';
import { format } from 'date-fns';
import { Feather } from '@expo/vector-icons';
import { RFValue } from 'react-native-responsive-fontsize';
import { useTheme } from 'styled-components';

import { api } from '../../services/api';
import { getPlatformDate } from '../../utils/getPlatformDate';
import { getAccessoryIcon } from '../../utils/getAccessoryIcon';
import { BackButton } from '../../components/BackButton';
import { ImageSlider } from '../../components/ImageSlider';
import { Accessory } from '../../components/Accessory';
import { Button } from '../../components/Button';

import { RootStackParams } from '../../routes/RootStackParams';

import * as S from './styles';


type RoutesProps=RouteProp<RootStackParams, 'SchedulingDetails'>

interface RentalPeriod {
  startFormatted: string;
  endFormatted: string;
}


export function SchedulingDetails(){
  const [loading, setLoading] = useState(false);
  const [rentalPeriod, setRentalPeriod] = useState<RentalPeriod>( {} as RentalPeriod );

  const navigation = useNavigation();
  const { params } = useRoute<RoutesProps>();
  const { carDTO , dates} = params;

  const theme = useTheme();

  async function handleConfirm() {
    const shedulesByCar = await api.get(`/schedules_bycars/${carDTO.id}`);
    const unavailable_dates = [
      ...shedulesByCar.data.unavailable_dates,
      ...dates,
    ];

    //ADD Load
    setLoading(true);

    /** MY CAR */
    await api.post('schedules_byuser', {
      user_id: 1,
      carDTO,
      startDate: format(getPlatformDate(new Date(dates[0])), 'dd/MM/yyyy'),
      endDate: format(getPlatformDate(new Date(dates[dates.length -1])), 'dd/MM/yyyy'),
    })

    /** ADD  DATE CAR */
    api.put(`/schedules_bycars/${carDTO.id}`,{
      id: carDTO.id,
      unavailable_dates
    })
    .then(() => {navigation.navigate('Confirmation', {
      confirmationDTO: {
        title: 'Carro Alugado!',
        message:`Agora você só precisa ir\naté a concessionária da RENTX\npegar o seu automóvel.`,
        nextScreenRoute:'Home',
      }
    })})
    .catch(() => {
      setLoading(false);
      Alert.alert('Não foi possível confirmar o agendamento.')
    });
  }

  function handleBackScreen() {
    navigation.goBack();
  }

  const rentTotal = Number(dates.length * carDTO.price)

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
        <ImageSlider imagesUrl={carDTO.photos}/>
      </S.CarImages>

      <S.Content>
        <S.Details>
          <S.Description>
            <S.Brand>{carDTO.brand}</S.Brand>
            <S.Name>{carDTO.name}</S.Name>
          </S.Description>

          <S.Rent>
            <S.Period>{carDTO.period}</S.Period>
            <S.Price>R$ {carDTO.price}</S.Price>
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
            <S.RentalPriceQuota>{`R$ ${carDTO.price}  x${dates.length} diárias`}</S.RentalPriceQuota>
            <S.RentalPriceTotal>R$ {rentTotal}</S.RentalPriceTotal>
          </S.RentalPriceDetails>
        </S.RentalPrice>
      </S.Content>

      <S.Footer>
        <Button
          title="Alugar agora"
          color={theme.colors.success}
          onPress={handleConfirm}
          enabled={!loading}
          loading={loading}
        />
      </S.Footer>
    </S.Container>
  );
};
