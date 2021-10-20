import React from 'react';
import { TextInputProps } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useTheme } from 'styled-components';

import * as S from './styles';

interface Props extends TextInputProps{
  iconName?: React.ComponentProps<typeof Feather>['name']
  size?: number;
}

export function Input({ iconName, size, ...rest}: Props){
  const theme = useTheme();

  return (
    <S.Container>
      <S.IconContainer>
        <Feather
          name={iconName}
          size={size}
          color={theme.colors.text_detail}
        />
      </S.IconContainer>

      <S.InputText {...rest}/>
    </S.Container>
  );
};
