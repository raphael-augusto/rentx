import React, { useState, useEffect } from 'react';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { Alert } from 'react-native';
import { format } from 'date-fns';
import { Feather } from '@expo/vector-icons';
import { RFValue } from 'react-native-responsive-fontsize';
import { useTheme } from 'styled-components';
import { useNetInfo } from '@react-native-community/netinfo';

import { database } from '../../database';
import { Car as ModelCar} from '../../database/model/Car';
import { api } from '../../services/api';
import { getPlatformDate } from '../../utils/getPlatformDate';
import { getAccessoryIcon } from '../../utils/getAccessoryIcon';
import { BackButton } from '../../components/BackButton';
import { ImageSlider } from '../../components/ImageSlider';
import { Accessory } from '../../components/Accessory';
import { Button } from '../../components/Button';
import { CarDTO } from '../../dtos/CarDTO';

import { RootStackParams } from '../../routes/RootStackParams';

import * as S from './styles';


type RoutesProps=RouteProp<RootStackParams, 'SchedulingDetails'>

interface RentalPeriod {
  startFormatted: string;
  endFormatted: string;
}


export function SchedulingDetails(){
  const [car , setCar] = useState<ModelCar>({} as ModelCar);
  const [carUpdated, setCarUpdated] = useState<CarDTO>({} as CarDTO)
  const [loading, setLoading] = useState(false);
  const [rentalPeriod, setRentalPeriod] = useState<RentalPeriod>( {} as RentalPeriod );
  const netInfo = useNetInfo();

  const navigation = useNavigation();
  const { params } = useRoute<RoutesProps>();
  const { carId , dates} = params;

  const theme = useTheme();

  async function handleConfirm() {
    //ADD Load
    setLoading(true);

    /** MY CAR */
    await api.post('/rentals', {
      user_id: 1,
      car_id: car.id,
      start_date: new Date(dates[0]),
      end_date: new Date(dates[dates.length - 1]),
      total: rentTotal
    })
    .then(() => {navigation.navigate('Confirmation', {
      confirmationDTO: {
        title: 'Carro Alugado!',
        message:`Agora você só precisa ir\naté a concessionária da RENTX\npegar o seu automóvel.`,
        nextScreenRoute:'Home',
      }
    })})
    .catch((error) => {
      console.log(error);

      setLoading(false);
      Alert.alert('Não foi possível confirmar o agendamento.')
    });
  }

  function handleBackScreen() {
    navigation.goBack();
  }

  const rentTotal = Number(dates.length * carUpdated.price)


  const getCarById = async (id: string) => {
    try{
      const carColletion = database.get<ModelCar>('cars');
      const cars = await carColletion.query().fetch();

      const findCar = cars.find(car => car.id === carId);

      if (!findCar) return;

      setCar(findCar);

    }catch(error){
      console.log(error);
    };
  };

  async function fetchCarUpdated() {
    const response = await api.get(`/cars/${carId}`);

    setCarUpdated(response.data);
  };


  useEffect(()=>{
    setRentalPeriod({
      startFormatted: format(getPlatformDate(new Date(dates[0])), 'dd/MM/yyyy'),
      endFormatted: format(getPlatformDate(new Date(dates[dates.length -1])), 'dd/MM/yyyy'),
    });
  },[]);

  useEffect(()=>{
    getCarById(carId);

    if(netInfo.isConnected === true){
      fetchCarUpdated();
    }
  },[netInfo.isConnected])

  return (
    <S.Container>
      <S.Header>
        <BackButton onPress={handleBackScreen} />
      </S.Header>

      <S.CarImages>
        <ImageSlider imagesUrl={
          !!carUpdated.photos ?
          carUpdated.photos :
          [{ id: "1", photo: car.thumbnail}]
        }/>
      </S.CarImages>

      <S.Content>
        <S.Details>
          <S.Description>
            <S.Brand>{car.brand}</S.Brand>
            <S.Name>{car.name}</S.Name>
          </S.Description>

          <S.Rent>
            <S.Period>{car.period}</S.Period>
            <S.Price>R$ {car.price}</S.Price>
          </S.Rent>
        </S.Details>

        {
          carUpdated.accessories &&
          <S.Accessories>
          {
            carUpdated.accessories.map(accessory => (
              <Accessory
                key={accessory.type}
                name={accessory.name}
                icon={getAccessoryIcon(accessory.type)}
              />
            ))
          }
          </S.Accessories>
        }

        <S.RentalPeriod>
          <S.CalendarIcon>
            <Feather
              name="calendar"
              size={RFValue(24)}
              color={theme.colors.shape}
            />
          </S.CalendarIcon>

          <S.DateInfo>
            <S.DateTitle>DE</S.DateTitle>
            <S.DateValue>{rentalPeriod.startFormatted}</S.DateValue>
          </S.DateInfo>

          <Feather
              name="chevron-right"
              size={RFValue(10)}
              color={theme.colors.shape}
          />

          <S.DateInfo>
            <S.DateTitle>ATÉ</S.DateTitle>
            <S.DateValue>{rentalPeriod.endFormatted}</S.DateValue>
          </S.DateInfo>
        </S.RentalPeriod>

        <S.RentalPrice>
          <S.RentalPriceLabel>TOTAL</S.RentalPriceLabel>

          <S.RentalPriceDetails>
            <S.RentalPriceQuota>{`R$ ${car.price}  x${dates.length} diárias`}</S.RentalPriceQuota>
            <S.RentalPriceTotal>R$ {rentTotal}</S.RentalPriceTotal>
          </S.RentalPriceDetails>
        </S.RentalPrice>
      </S.Content>

      <S.Footer>
        <Button
          title="Alugar agora"
          color={theme.colors.success}
          onPress={handleConfirm}
          enabled={!loading}
          loading={loading}
        />
      </S.Footer>
    </S.Container>
  );
};
