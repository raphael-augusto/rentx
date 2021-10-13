import styled from 'styled-components/native';
import { FlatList } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { CarDTO } from '../../dtos/CarDTO';
import { RectButton } from 'react-native-gesture-handler';

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

export const MyCarsButton = styled(RectButton)`
  width: 60px;
  height: 60px;

  justify-content: center;
  align-items: center;

  border-radius: 30px;

  position: absolute;
  bottom: 13px;
  right: 22px;

  background-color: ${({theme}) => theme.colors.main};
`;
