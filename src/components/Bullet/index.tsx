import React from 'react';

import * as S from './styles';

interface BulletProps {
  active?: boolean;
};

export function Bullet({ active = false }:BulletProps){
  return (
    <S.Container active={active} />
  );
};
