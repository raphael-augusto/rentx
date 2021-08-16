import React from 'react';
import { RFValue } from 'react-native-responsive-fontsize';

import Logo from '../../assets/logo.svg';

import * as S from './styles';

interface Props{
  title?: string;
}

export function Header({title}: Props){
  return (
    <S.Header>
      <S.HeaderContent>
        <Logo
            width={RFValue(108)}
            height={RFValue(12)}
        />
        <S.TotalCards>
          {title}
        </S.TotalCards>
      </S.HeaderContent>
    </S.Header>
  );
};
