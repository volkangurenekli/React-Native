/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {Formik} from 'formik';
import {
  Container,
  Header,
  Content,
  Form,
  Item,
  Input,
  Label,
  Left,
  Title,
  Right,
  Body,
  Button,
  Text,
  Spinner,
} from 'native-base';
import * as Yup from 'yup';

const api = user => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (user.email === 'hi@hi.com') {
        reject({email: 'email already use.'});
      }

      resolve();
    }, 2000);
  });
};

const validations = Yup.object().shape({
  email: Yup.string()
    .email()
    .required(),
  password: Yup.string()
    .min(6)
    .required(),
  passwordConfirm: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords not matched.')
    .required(),
});

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  _handleSubmit = async (values, bag) => {
    try {
      await api(values);
      bag.setSubmitting(false);
      alert('welcome');
    } catch (e) {
      bag.setSubmitting(false);
      bag.setErrors(e);
    }
  };

  render() {
    return (
      <Container>
        <Header>
          <Left />
          <Body>
            <Title>Sign Up</Title>
          </Body>
          <Right />
        </Header>
        <Formik
          initialValues={{
            email: '',
            password: '',
            passwordConfirm: '',
          }}
          onSubmit={this._handleSubmit}
          validationSchema={validations}>
          {({
            values,
            handleChange,
            handleSubmit,
            errors,
            touched,
            setFieldTouched,
            isValid,
            isSubmitting,
          }) => (
            <Content style={{padding: 10}}>
              <Item error={errors.email && touched.email}>
                <Input
                  onChangeText={handleChange('email')}
                  value={values.email}
                  placeholder="e-mail"
                  onBlur={() => setFieldTouched('email')}
                  autoCapitalize={'none'}
                  keyboardType={'email-address'}
                />

                {errors.email && touched.email && (
                  <Text style={{color: 'red'}}>{errors.email}</Text>
                )}
              </Item>

              <Item error={errors.password && touched.password}>
                <Input
                  onChangeText={handleChange('password')}
                  value={values.password}
                  placeholder="password"
                  onBlur={() => setFieldTouched('password')}
                  autoCapitalize={'none'}
                  secureTextEntry={true}
                />

                {errors.password && touched.password && (
                  <Text style={{color: 'red'}}>{errors.password}</Text>
                )}
              </Item>

              <Item error={errors.passwordConfirm && touched.passwordConfirm}>
                <Input
                  onChangeText={handleChange('passwordConfirm')}
                  value={values.passwordConfirm}
                  placeholder="password confirmation"
                  onBlur={() => setFieldTouched('passwordConfirm')}
                  autoCapitalize={'none'}
                  secureTextEntry={true}
                />

                {errors.passwordConfirm && touched.passwordConfirm && (
                  <Text style={{color: 'red'}}>{errors.passwordConfirm}</Text>
                )}
              </Item>

              <Button
                block
                disabled={!isValid || isSubmitting}
                onPress={handleSubmit}
                style={{marginTop: 10}}>
                {isSubmitting && <Spinner size={'small'} color={'white'} />}
                <Text>Submit</Text>
              </Button>
            </Content>
          )}
        </Formik>
      </Container>
    );
  }
}
