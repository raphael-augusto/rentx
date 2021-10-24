import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native';
import * as Yup from 'yup';

import { BackButton } from '../../../components/BackButton';
import { Bullet } from '../../../components/Bullet';
import { Input } from '../../../components/Input';
import { Button } from '../../../components/Button';

import * as S from './styles';


export function SignUpFirstStep(){
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [driverLicense, setDriverLicense] = useState('');
  const navigation = useNavigation();


  function handlerBack() {
    navigation.goBack();
  }

  async function handlerNextStep() {
    try {
      const schema = Yup.object().shape({
        driverLicense: Yup.string()
          .required('CNH é obrigatório'),
        email: Yup.string()
          .email('E-mail inválido')
          .required('E-mail é obrigatório'),
        name: Yup.string()
          .required('Nome é obrigatório')
      });

      const data = { name, email, driverLicense };
      await schema.validate(data);

      navigation.navigate('SignUpSecondStep', { userDTO: data });

    } catch (error) {
      if(error instanceof Yup.ValidationError){
        return Alert.alert('Opa', error.message);
      }
    };
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
            <S.FormTitle>1. Dados</S.FormTitle>
            <Input
              iconName="user"
              size={24}
              placeholder="Nome"
              onChangeText={setName}
              value={name}
            />
            <Input
              iconName="mail"
              size={24}
              placeholder="E-mail"
              keyboardType="email-address"
              onChangeText={setEmail}
              value={email}
              autoCapitalize="none"
              autoCorrect={false}
            />
            <Input
              iconName="credit-card"
              size={24}
              placeholder="CNH"
              keyboardType="numeric"
              onChangeText={setDriverLicense}
              value={driverLicense}
            />
          </S.Form>
          <Button
            title="Próximo"
            onPress={handlerNextStep}
          />
        </S.Container>
    </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};
