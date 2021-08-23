import React from 'react';
import { useNavigation } from '@react-navigation/native';

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

type NavigationProps = {
  navigate: (screen:string) => void;
}

export function CardDetails(){
  const navigation = useNavigation<NavigationProps>();


  function handleConfirmScheduling() {
    navigation.navigate('Scheduling');
  }

  return (
    <S.Container>
      <S.Header>
        <BackButton onPress={() => {}}/>
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

        <S.About>
          Este é automóvel desportivo. Surgiu do lendário touro de lide indultado
          na praça Real Maestranza de Sevilla. É um belíssimo carro para quem
          gosta de acelerar.
        </S.About>
      </S.Content>

      <S.Footer>
        <Button title="Escolher período do aluguel" onPress={handleConfirmScheduling}/>
      </S.Footer>
    </S.Container>
  );
};
