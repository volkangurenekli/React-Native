import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  KeyboardAvoidingView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import XInput from '../components/XInput';
import XButton from '../components/XButton';
export class Login extends Component {
  state = {
    username: '',
    password: '',
  };

  onSubmit = (username, password) => {
    alert(`username:${username} password:${password}`);
  };

  render() {
    const {username, password} = this.state;
    console.log('VOLKAN: Login -> render -> this.state', this.state);

    return (
      <View style={styles.container}>
        <View style={styles.headerBG} />
        <View>
          <Text style={styles.logo}>UDAC</Text>
          <Text style={styles.description}>Property & Tax Survey</Text>
        </View>
        <KeyboardAvoidingView behavior={'position'}>
          <ScrollView>
            <View style={styles.loginArea}>
              <Text style={styles.loginTitle}>Property Tax Server</Text>
              <Text style={styles.loginDescription}>
                Unique Door No Easily Fill Your Entire Property Tax Using App
              </Text>
              <View>
                <Text style={styles.signInText}>Sign In</Text>

                <XInput
                  returnKeyType={'next'}
                  autoCapitalize="none"
                  placeholder="Username"
                  value={username}
                  onSubmitEditing={() => this.passwordInput.focus()}
                  onChangeText={text => this.setState({username: text})}
                />

                <XInput
                  // returnKeyType={'go'}
                  secureTextEntry
                  placeholder="Password"
                  value={password}
                  inputRef={input => (this.passwordInput = input)}
                  onChangeText={text => this.setState({password: text})}
                />

                <XButton
                  color={'#f1f1f1'}
                  backgroundColor={'#0065e0'}
                  text={'Sign In Now'}
                  onPress={() => this.onSubmit(username, password)}
                />
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
        <View style={styles.signUpArea}>
          <Text style={styles.signUpDescription}>Don`t have an account?</Text>
          <TouchableOpacity>
            <Text style={styles.signUpText}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default Login;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
    paddingVertical: 80,
  },
  headerBG: {
    position: 'absolute',
    top: -600,
    left: -450,
    height: 1000,
    width: 1000,
    backgroundColor: '#1572de',
    borderRadius: 500,
  },
  logo: {
    textAlign: 'center',
    fontSize: 40,
    fontWeight: 'bold',
    color: '#f2f2f2',
  },
  description: {
    textAlign: 'center',
    color: '#f2f2f2',
  },
  loginArea: {
    marginHorizontal: Dimensions.get('window').width / 10,
    marginVertical: Dimensions.get('window').height / 10,
    backgroundColor: '#fff',
    padding: Dimensions.get('window').width / 20,
    borderRadius: 5,
    //shadow
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 4,
  },
  loginTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  loginDescription: {
    fontSize: 11,
    color: '#7e868f',
    marginVertical: 10,
    textAlign: 'center',
  },

  signUpArea: {
    alignItems: 'center',
  },
  signUpDescription: {
    color: '#999',
  },
  signUpText: {
    color: '#666',
  },
  signInText: {
    marginVertical: Dimensions.get('window').height / 40,
    fontSize: 14,
    color: '#333',
  },
});
