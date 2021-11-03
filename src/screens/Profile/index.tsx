import React, { useState } from 'react';
import { KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard } from 'react-native';
import {  useNavigation } from '@react-navigation/native';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { Feather } from '@expo/vector-icons';
import { useTheme } from 'styled-components';

import { useAuth } from '../../hooks/auth';
import { Input } from '../../components/Input';
import { PasswordInput } from '../../components/PasswordInput';
import { BackButton } from '../../components/BackButton';

import * as S from './styles';

export function Profile(){
  const [option, setOption] = useState<'daEdit' | 'passwordEdit'>('daEdit');
  const { user } = useAuth();
  const nagivation = useNavigation()
  const theme = useTheme();

  function handleBack() {
    nagivation.goBack();
  }

  function handleSinOut() {
  }

  function handleOptionChange(optionSelected:'daEdit' | 'passwordEdit' ) {
    setOption(optionSelected);
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
              <S.LogoutButton onPress={handleSinOut}>
                <Feather
                  name="power"
                  size={24}
                  color={theme.colors.shape}
                />
              </S.LogoutButton>
            </S.HeaderTop>

            <S.PhotoContainer>
              <S.Photo source={{ uri:'https://avatars.githubusercontent.com/u/66637194?v=4'  }}/>
              <S.PhotoButton onPress={() => {}}>
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
          </S.Content>
        </S.Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};
