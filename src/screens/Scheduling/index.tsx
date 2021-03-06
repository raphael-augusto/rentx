import React, { useEffect, useState }from 'react';
import { StatusBar } from 'react-native';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { useTheme } from 'styled-components';
import { format } from 'date-fns';

import { database } from '../../database';
import { Car as ModelCar} from '../../database/model/Car';
import { getPlatformDate } from '../../utils/getPlatformDate';
import { BackButton } from '../../components/BackButton';
import { Calendar, DayProps, GenerateInterval, MarkedDateProps} from '../../components/Calendar';
import { Button } from '../../components/Button';
import { RootStackParams } from '../../routes/RootStackParams';

import ArrowSvg from '../../assets/arrow.svg';

import * as S from './styles';


type RoutesProps=RouteProp<RootStackParams, 'Scheduling'>


interface RentalPeriod {
  startFormatted: string;
  endFormatted: string;
}

export function Scheduling(){
  const [car , setCar] = useState<ModelCar>({} as ModelCar);
  const [lastSelectedDate, setLastSelectedDate] = useState<DayProps>( {} as DayProps );
  const [markedDates, setMarkedDates] = useState<MarkedDateProps>( {} as MarkedDateProps );
  const [rentalPeriod, setRentalPeriod] = useState<RentalPeriod>( {} as RentalPeriod );

  const navigation = useNavigation();
  const { params } = useRoute<RoutesProps>();
  const { carId } = params;

  const theme = useTheme();

  function handleConfirmRental() {
    navigation.navigate('SchedulingDetails', { carId, dates: Object.keys(markedDates) });
  }

  function handleBackScreen() {
    navigation.goBack();
  }

  function handleChangeDate(date: DayProps) {
    let start = !lastSelectedDate.timestamp ? date : lastSelectedDate;
    let end = date;

    if(start.timestamp > end.timestamp){
      start = end;
      end   = start;
    }

    setLastSelectedDate(end);

    const interval = GenerateInterval(start, end);
    setMarkedDates(interval);

    const firstDate = Object.keys(interval)[0];
    const endDate = Object.keys(interval)[Object.keys(interval).length - 1];

    setRentalPeriod({
      startFormatted: format(getPlatformDate(new Date(firstDate)), 'dd/MM/yyyy'),
      endFormatted: format(getPlatformDate(new Date(endDate)), 'dd/MM/yyyy'),
    });
  }


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


  useEffect(()=>{
    getCarById(carId);
  },[])

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
          data de in??cio e {'\n'}
          fim do aluguel
        </S.Title>

        <S.RentalPeriod>
          <S.DateInfo>
            <S.DateTitle>DE</S.DateTitle>
            <S.ContentDateValue selected={!!rentalPeriod.startFormatted}>
              <S.DateValue>{rentalPeriod.startFormatted}</S.DateValue>
            </S.ContentDateValue>
          </S.DateInfo>

          <ArrowSvg />

          <S.DateInfo>
            <S.DateTitle>AT??</S.DateTitle>
            <S.ContentDateValue selected={!!rentalPeriod.endFormatted}>
              <S.DateValue>{rentalPeriod.endFormatted}</S.DateValue>
            </S.ContentDateValue>
          </S.DateInfo>
        </S.RentalPeriod>
      </S.Header>

      <S.Content>
        <Calendar
          markedDates={markedDates}
          onDayPress={handleChangeDate}
        />
      </S.Content>

      <S.Footer>
        <Button
          title="Confirmar"
          onPress={handleConfirmRental}
          enabled={!!rentalPeriod.startFormatted}
        />
      </S.Footer>
    </S.Container>
  );
};
