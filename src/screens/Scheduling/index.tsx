import React, { useState }from 'react';
import { StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from 'styled-components';

import { BackButton } from '../../components/BackButton';
import { Calendar, DayProps, GenerateInterval, MarkedDateProps} from '../../components/Calendar';
import { Button } from '../../components/Button';

import ArrowSvg from '../../assets/arrow.svg';

import * as S from './styles';

type NavigationProps = {
  navigate: (screen:string) => void;
  goBack: () => void;
}

export function Scheduling(){
  const [lastSelectedDate, setLastSelectedDate] = useState<DayProps>( {} as DayProps );
  const [markedDates, setMarkedDates] = useState<MarkedDateProps>( {} as MarkedDateProps );

  const navigation = useNavigation<NavigationProps>();
  const theme = useTheme();


  function handleConfirmRental() {
    navigation.navigate('SchedulingDetails');
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

        <S.RentalPeriod>
          <S.DateInfo>
            <S.DateTitle>DE</S.DateTitle>
            <S.ContentDateValue selected={false}>
              <S.DateValue>28/01/2021</S.DateValue>
            </S.ContentDateValue>
          </S.DateInfo>

          <ArrowSvg />

          <S.DateInfo>
            <S.DateTitle>ATÉ</S.DateTitle>
            <S.ContentDateValue selected={false}>
              <S.DateValue>28/01/2021</S.DateValue>
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
        <Button title="Confirmar" onPress={handleConfirmRental}/>
      </S.Footer>
    </S.Container>
  );
};
