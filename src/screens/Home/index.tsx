import React from 'react';
import { StatusBar } from 'react-native';

import { Header } from '../../components/Header';
import { Car } from '../../components/Car';

import * as S from './styles';

export function Home(){
  const carData = {
    brand: 'AUDI',
    name: 'RS 5 Caupé',
    rent:{
      period: 'AO DIA',
      price: 120,
    },
    thumbnail:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQX9ULlIfz1HDoSSr6atk5wZmFr9nbCTp-kCjrygP6WIeiUu3NB1aQaragDpWKknPScpKI&usqp=CAU'
  }


  return (
    <S.Container >
      <StatusBar
        barStyle='light-content'
        /** android */
        backgroundColor="transparent"
        translucent
      />
      <Header title="Total de carros 12 carros"/>

      <S.CardList
        data={[1,2,3]}
        keyExtractor={item => String(item)}
        renderItem={({item}) => <Car data={carData}/>}
      />

    </S.Container>
  );
};
