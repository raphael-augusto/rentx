import React from 'react';

import * as S from './styles';

interface Props {
  title: string;
  color?: string;
  onPress: () => void;
}

export function Button({title, color, onPress}:Props){
  return (
    <S.Container
      color={color}
      onPress={onPress}
    >
      <S.Title>{title}</S.Title>
    </S.Container>
  );
};
