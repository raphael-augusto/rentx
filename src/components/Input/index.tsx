import React, { useState } from 'react';
import { TextInputProps } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useTheme } from 'styled-components';

import * as S from './styles';

interface Props extends TextInputProps{
  iconName?: React.ComponentProps<typeof Feather>['name']
  size?: number;
  value?: string;
}

export function Input({ iconName, size, value, ...rest}: Props){
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);
  const theme = useTheme();

  function hancleInputFocus() {
    setIsFocused(true);
  };

  function hancleInputBlur() {
    setIsFocused(false);
    setIsFilled(!!value);
  };

  return (
    <S.Container >
      <S.IconContainer>
        <Feather
          name={iconName}
          size={size}
          color={(isFocused || isFilled) ? theme.colors.main : theme.colors.text_detail}
        />
      </S.IconContainer>

      <S.InputText
        onFocus={hancleInputFocus}
        onBlur={hancleInputBlur}
        isFocused={isFocused}
        {...rest}
      />
    </S.Container>
  );
};
