import React from 'react';

import * as S from './styles';

interface Props {
  imagesUrl:string[];
}

export function ImageSlider({ imagesUrl }:Props){
  return (
    <S.Container>
      <S.ImageIndexs>
        <S.ImageIndex active={true}/>
        <S.ImageIndex active={false}/>
        <S.ImageIndex active={false}/>
        <S.ImageIndex active={false}/>
        <S.ImageIndex active={false}/>
      </S.ImageIndexs>
      <S.CarImageWrapper>
        <S.CarImage
          source={{uri: imagesUrl[0]}}
          resizeMode="contain"
        />
      </S.CarImageWrapper>

    </S.Container>
  );
};
