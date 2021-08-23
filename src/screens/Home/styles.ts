import styled from 'styled-components/native';
import { FlatList } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { CarDTO } from '../../dtos/CarDTO';

export const Container = styled.View`
  flex: 1;

  background-color: ${({theme}) => theme.colors.background_primary};
`;

export const CardList = styled(FlatList as new () => FlatList<CarDTO> ).attrs({
  contentContainerStyle: {
    padding: 24
  },
  showVerticalScrollIndicator: false
})``;
