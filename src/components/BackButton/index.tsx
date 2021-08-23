import React from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import { useTheme } from 'styled-components';
import { BorderlessButtonProps } from 'react-native-gesture-handler';

import * as S from './styles';

interface Props extends BorderlessButtonProps {
  color?: string;
  size?: number;
}

export function BackButton({ color, size, ...rest}: Props){
  const theme = useTheme();

  return (
    <S.Container  {...rest}>
      <MaterialIcons
        name="chevron-left"
        size={size ? size : 24}
        color={color ? color : theme.colors.text}
      />

    </S.Container>
  );
};
