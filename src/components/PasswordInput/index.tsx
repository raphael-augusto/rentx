import React, { useState } from 'react';
import { TextInputProps } from 'react-native';
import { BorderlessButton } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';
import { useTheme } from 'styled-components';


import * as S from './styles';

interface Props extends TextInputProps{
  iconName?: React.ComponentProps<typeof Feather>['name']
  size?: number;
}

export function PasswordInput({ iconName, size, ...rest}: Props){
  const [isPasswordVisible, setIsPasswordVisible] = useState(true);
  const theme = useTheme();

  function handlePasswordVisibilityChange() {
    setIsPasswordVisible((prevState) => !prevState);
  }

  return (
    <S.Container>
      <S.IconContainer>
        <Feather
          name={iconName}
          size={size}
          color={theme.colors.text_detail}
        />
      </S.IconContainer>

      <S.InputText
        secureTextEntry={isPasswordVisible}
        {...rest}
      />

      <BorderlessButton onPress={handlePasswordVisibilityChange}>
        <S.IconContainer>
          <Feather
            name={isPasswordVisible ? 'eye' : 'eye-off'}
            size={size}
            color={theme.colors.text_detail}
          />
        </S.IconContainer>
      </BorderlessButton>
    </S.Container>
  );
};
