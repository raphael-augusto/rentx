import React, { useState } from 'react';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native';
import { useTheme } from 'styled-components';

import { RootStackParams } from '../../../routes/RootStackParams';
import { BackButton } from '../../../components/BackButton';
import { Bullet } from '../../../components/Bullet';
import { PasswordInput } from '../../../components/PasswordInput';
import { Button } from '../../../components/Button';

import * as S from './styles';


type RoutesProps=RouteProp<RootStackParams, 'SignUpSecondStep'>

export function SignUpSecondStep(){
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const navigation = useNavigation();
  const { params } = useRoute<RoutesProps>();
  const { userDTO } = params;

  const theme = useTheme();

  function handlerBack() {
    navigation.goBack();
  }

  function handleRegister() {
    /** validation in password */
    if(!password || !passwordConfirm){
      return Alert.alert('Informe a senha e confirmação. ');
    }
    if(password !== passwordConfirm){
      return Alert.alert('As senhas não são iguais.');
    }

    /** register the user */
    navigation.navigate('Confirmation', {
      confirmationDTO:{
        title:'Conta Criada!',
        message:`Agora é só fazer login\ne aproveitar.`,
        nextScreenRoute: 'SignIn'
    }})
  }

  return (
    <KeyboardAvoidingView behavior="position" enabled>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <S.Container>
          <S.Header>
            <BackButton onPress={handlerBack}/>
            <S.Steps>
              <Bullet active/>
              <Bullet />
            </S.Steps>
          </S.Header>

          <S.Title>
            Crie sua{'\n'}conta.
          </S.Title>
          <S.SubTitle>
            Faça seu cadastro de{'\n'}
            forma rápida e fácil.
          </S.SubTitle>

          <S.Form>
            <S.FormTitle>2. Senha</S.FormTitle>
            <PasswordInput
              iconName="lock"
              size={24}
              placeholder="Senha"
              onChangeText={setPassword}
              value={password}
            />
            <PasswordInput
              iconName="lock"
              size={24}
              placeholder="Repetir senha"
              onChangeText={setPasswordConfirm}
              value={passwordConfirm}
            />
          </S.Form>
          <Button
            title="Cadastrar"
            color={theme.colors.success}
            onPress={handleRegister}
          />
        </S.Container>
    </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};
