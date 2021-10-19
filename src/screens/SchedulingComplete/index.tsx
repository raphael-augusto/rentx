import React from 'react';
import { RouteProp, useNavigation } from '@react-navigation/native';
import { useWindowDimensions, StatusBar } from 'react-native';

import LogoSvg from '../../assets/logo_background_gray.svg';
import DoneSvg from '../../assets/done.svg';

import { ConfirmButton } from '../../components/ConfirmButton';


import * as S from './styles';


export function SchedulingComplete(){
  const navigation = useNavigation();
  const { width } = useWindowDimensions();

function handleConfirmCard() {
  navigation.navigate('Home');
}


  return (
    <S.Container>
      <StatusBar
        barStyle="light-content"
        translucent
        backgroundColor="transparent"
      />
      <LogoSvg width={ width } />
      <S.Content>
        <DoneSvg width={ 80 }  height={ 80 }/>
        <S.Title>Carro Alugado!</S.Title>

        <S.Menssage>
          Agora você só precisa ir {'\n'}
          até a concessionária da RENTX {'\n'}
          pegar o seu automóvel.
        </S.Menssage>
      </S.Content>

      <S.Footer>
        <ConfirmButton title="OK" onPress={handleConfirmCard}/>
      </S.Footer>
    </S.Container>
  );
};
