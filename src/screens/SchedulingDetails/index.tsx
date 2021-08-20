import React from 'react';
import { Feather } from '@expo/vector-icons';
import { RFValue } from 'react-native-responsive-fontsize';
import { useTheme } from 'styled-components';

import speedSvg from '../../assets/speed.svg';
import acceleration from '../../assets/acceleration.svg';
import force from '../../assets/force.svg';
import gasoline from '../../assets/gasoline.svg';
import exchange from '../../assets/exchange.svg';
import people from '../../assets/people.svg';


import { BackButton } from '../../components/BackButton';
import { ImageSlider } from '../../components/ImageSlider';
import { Accessory } from '../../components/Accessory';
import { Button } from '../../components/Button';


import * as S from './styles';


export function SchedulingDetails(){
  const theme = useTheme();

  return (
    <S.Container>
      <S.Header>
        <BackButton onPress={() => {}} />
      </S.Header>

      <S.CarImages>
        <ImageSlider imagesUrl={['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQX9ULlIfz1HDoSSr6atk5wZmFr9nbCTp-kCjrygP6WIeiUu3NB1aQaragDpWKknPScpKI&usqp=CAU']}/>
      </S.CarImages>

      <S.Content>
        <S.Details>
          <S.Description>
            <S.Brand>Lamborghini</S.Brand>
            <S.Name>Huracan</S.Name>
          </S.Description>

          <S.Rent>
            <S.Period>Ao dia</S.Period>
            <S.Price>R$ 580</S.Price>
          </S.Rent>
        </S.Details>

        <S.Accessories>
          <Accessory name="308km/h" icon={speedSvg}/>
          <Accessory name="3.2s" icon={acceleration}/>
          <Accessory name="800 HP" icon={force}/>
          <Accessory name="Gasolina" icon={gasoline}/>
          <Accessory name="Auto" icon={exchange}/>
          <Accessory name="2 Ppessoas" icon={people}/>
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
            <S.DateValue>28/01/2021</S.DateValue>
          </S.DateInfo>

          <Feather
              name="chevron-right"
              size={RFValue(10)}
              color={theme.colors.shape}
          />

          <S.DateInfo>
            <S.DateTitle>DE</S.DateTitle>
            <S.DateValue>28/01/2021</S.DateValue>
          </S.DateInfo>
        </S.RentalPeriod>

        <S.RentalPrice>
          <S.RentalPriceLabel>TOTAL</S.RentalPriceLabel>

          <S.RentalPriceDetails>
            <S.RentalPriceQuota>R$ 580 x3 diárias</S.RentalPriceQuota>
            <S.RentalPriceTotal>R$ 2.900</S.RentalPriceTotal>
          </S.RentalPriceDetails>
        </S.RentalPrice>
      </S.Content>

      <S.Footer>
        <Button title="Confirmar" />
      </S.Footer>
    </S.Container>
  );
};
