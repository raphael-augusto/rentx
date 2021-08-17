import React from 'react';

import * as S from './styles';

interface Props {
  title: string;
  color?: string;
}

export function Button({title, color, ...rest}:Props){
  return (
    <S.Container
      color={color}
      {...rest}
    >
      <S.Title>{title}</S.Title>
    </S.Container>
  );
};
