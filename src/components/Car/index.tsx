import React from 'react';
import { RectButtonProps } from 'react-native-gesture-handler';

import { CarDTO } from '../../dtos/CarDTO';
import GasolineSvg from '../../assets/gasoline.svg';

import * as S from './styles';

interface Props extends RectButtonProps{
  data: CarDTO;
}

export function Car({ data, ...rest }: Props){
  return (
    <S.Container {...rest}>
      <S.Details>
        <S.Brand>{data.brand}</S.Brand>
        <S.Name>{data.name}</S.Name>
        <S.About>
          <S.Rent>
            <S.Period>{data.rent.period}</S.Period>
            <S.Price>{`R$ ${data.rent.price}`}</S.Price>
          </S.Rent>

          <S.Type>
            <GasolineSvg />
          </S.Type>
        </S.About>
      </S.Details>

      <S.CarImage
        source={{uri: data.thumbnail}}
        resizeMode="contain"
      />
    </S.Container>
  );
};
