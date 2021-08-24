import React from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';

import { BackButton } from '../../components/BackButton';
import { ImageSlider } from '../../components/ImageSlider';
import { Accessory } from '../../components/Accessory';
import { Button } from '../../components/Button';
import { CarDTO } from '../../dtos/CarDTO';
import { getAccessoryIcon } from '../../utils/getAccessoryIcon';

import * as S from './styles';


type NavigationProps = {
  navigate: (screen:string) => void;
}
interface Params {
  car: CarDTO;
}

export function CardDetails(){
  const navigation = useNavigation<NavigationProps>();
  const route = useRoute();
  const { car } = route.params as Params;

  function handleConfirmScheduling() {
    navigation.navigate('Scheduling');
  }

  function handleBackScreen() {
    navigation.navigate('Home');
  }

  return (
    <S.Container>
      <S.Header>
        <BackButton onPress={handleBackScreen}/>
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

        <S.About>{car.about}</S.About>
      </S.Content>

      <S.Footer>
        <Button title="Escolher período do aluguel" onPress={handleConfirmScheduling}/>
      </S.Footer>
    </S.Container>
  );
};
