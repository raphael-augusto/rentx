import React, { useState } from 'react';
import { KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Yup from 'yup';
import {  useNavigation } from '@react-navigation/native';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { Feather } from '@expo/vector-icons';
import { useTheme } from 'styled-components';

import { useAuth } from '../../hooks/auth';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
import { PasswordInput } from '../../components/PasswordInput';
import { BackButton } from '../../components/BackButton';


import * as S from './styles';

export function Profile(){
  const { user, signOut, updatedUser } = useAuth();
  const [option, setOption] = useState<'daEdit' | 'passwordEdit'>('daEdit');
  const [avatar, setAvatar] = useState(user.avatar);
  const [name, setName] = useState(user.name);
  const [driver_license, setDriver_license ] = useState(user.driver_license);
  const nagivation = useNavigation();
  const theme = useTheme();

  function handleBack() {
    nagivation.goBack();
  }

  function handleOptionChange(optionSelected:'daEdit' | 'passwordEdit' ) {
    setOption(optionSelected);
  }

  async function handleAvatarSelect() {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    if (result.cancelled) {
      return;
    };

    if (result.uri) {
      setAvatar(result.uri);
    };
  }

  async function handleProfileUpdate() {
    try {
      const schema = Yup.object().shape({
        driver_license: Yup.string().required('CNH é obrigatória'),
        name: Yup.string().required('Nome é obrigatório'),
      });

      const data = {name, driver_license};
      await schema.validate(data);

      await updatedUser({
        id: user.id,
        user_id: user.user_id,
        email: user.email,
        name,
        driver_license:driver_license,
        avatar,
        token: user.token
      });

      Alert.alert('Perfil atualizado!');

    } catch (error){
      // console.log(error);
      if(error instanceof Yup.ValidationError){
        Alert.alert('Opa', error.message);
      }else{
        Alert.alert('Não foi possível atualizar o perfil');
      }
    };
  };

  async function handleSignOut() {
    Alert.alert(
      'Tem certeza?',
      'Se você sair, irá precisar de internet para conectar-se novamente.',
      [
        {
          text: 'Cancelar',
          onPress: () => {},
        },
        {
          text: "Sair",
          onPress: () => signOut()
        },
      ]
    );
  }

  return (
    <KeyboardAvoidingView behavior="position" enabled>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <S.Container>
          <S.Header>
            <S.HeaderTop>
              <BackButton
                color={theme.colors.shape}
                onPress={handleBack}
              />
              <S.HeaderTitle>Editar Perfil</S.HeaderTitle>
              <S.LogoutButton onPress={handleSignOut}>
                <Feather
                  name="power"
                  size={24}
                  color={theme.colors.shape}
                />
              </S.LogoutButton>
            </S.HeaderTop>

            <S.PhotoContainer>
              { !!avatar && <S.Photo source={{ uri: avatar}}/>}
              <S.PhotoButton onPress={handleAvatarSelect}>
                <Feather
                  name="camera"
                  size={24}
                  color={theme.colors.shape}
                />
              </S.PhotoButton>
            </S.PhotoContainer>
          </S.Header>

          <S.Content  style={{marginBottom: useBottomTabBarHeight() }}>
            <S.Options>
              <S.Option
                active={option === 'daEdit'}
                onPress={() => handleOptionChange('daEdit')}
              >
                <S.OptionTitle  active={option === 'daEdit'}>
                  Dados
                </S.OptionTitle>
              </S.Option>
              <S.Option
                active={option === 'passwordEdit'}
                onPress={() => handleOptionChange('passwordEdit')}
              >
                <S.OptionTitle active={option === 'passwordEdit'}>
                  Trocar senha
                </S.OptionTitle>
              </S.Option>
            </S.Options>
            {
              option === 'daEdit'
              ?
              <S.Section>
                <Input
                  iconName="user"
                  placeholder="Nome"
                  autoCorrect={false}
                  size={24}
                  defaultValue={user.name}
                  onChangeText={setName}
                />
                <Input
                  iconName="mail"
                  editable={false}
                  size={24}
                  defaultValue={user.email}
                />
                <Input
                  iconName="credit-card"
                  placeholder="CNH"
                  keyboardType="numeric"
                  size={24}
                  defaultValue={user.driver_license}
                  onChangeText={setDriver_license}
                />
              </S.Section>
              :
              <S.Section>
                <PasswordInput
                  iconName="lock"
                  placeholder="Senha atual"
                  autoCorrect={false}
                  size={24}
                />
                <PasswordInput
                  iconName="lock"
                  placeholder="Nova senha"
                  autoCorrect={false}
                  size={24}
                />
                <PasswordInput
                  iconName="lock"
                  placeholder="Repetir Senha"
                  autoCorrect={false}
                  size={24}
                />
              </S.Section>
            }

            <Button
              title="Salvar alterações"
              onPress={handleProfileUpdate}
            />
          </S.Content>
        </S.Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};
