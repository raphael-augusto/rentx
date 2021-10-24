import React from 'react';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { useWindowDimensions, StatusBar } from 'react-native';

import LogoSvg from '../../assets/logo_background_gray.svg';
import DoneSvg from '../../assets/done.svg';

import { RootStackParams } from '../../routes/RootStackParams';
import { ConfirmButton } from '../../components/ConfirmButton';


import * as S from './styles';

type RoutesProps=RouteProp<RootStackParams, 'Confirmation'>

export function Confirmation(){
  const { width } = useWindowDimensions();
  const navigation = useNavigation();
  const { params } = useRoute<RoutesProps>();
  const { confirmationDTO } = params

  function handleConfirmCard() {
    navigation.navigate(confirmationDTO.nextScreenRoute);
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
        <S.Title>{confirmationDTO.title}</S.Title>

        <S.Menssage>{confirmationDTO.message}</S.Menssage>
      </S.Content>

      <S.Footer>
        <ConfirmButton title="OK" onPress={handleConfirmCard}/>
      </S.Footer>
    </S.Container>
  );
};
