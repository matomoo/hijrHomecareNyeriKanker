import React, { Component } from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Image,
  Text,
  View,
  TextInput,
  TouchableHighlight,
  Alert,
  AsyncStorage,
} from 'react-native';
import { auth, db } from '../../../firebase';
import { observer } from 'mobx-react';
import { inject } from 'mobx-react/native';

interface IProps {
  navigation?: any;
  store: any;
}

interface IState {
  // isLoggingIn: boolean;
  email;
  password;
}

@inject('store') @observer
class Screen extends Component<IProps, IState> {

  constructor(props) {
    super(props);
    this.state = {
      email   : '',
      password: '',
    };
  }

  public render() {
    return (
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image style={styles.imageLogo} source={require('../../../../assets/app_splash.png')} />
        </View>
        <View style={styles.inputContainer}>
          <Image style={styles.inputIcon} source={{uri: 'https://png.icons8.com/message/ultraviolet/50/3498db'}}/>
          <TextInput style={styles.inputs}
              placeholder='Email'
              keyboardType='email-address'
              underlineColorAndroid='transparent'
              onChangeText={(email) => this.setState({email})}/>
        </View>

        <View style={styles.inputContainer}>
          <Image style={styles.inputIcon} source={{uri: 'https://png.icons8.com/key-2/ultraviolet/50/3498db'}}/>
          <TextInput style={styles.inputs}
              placeholder='Password'
              secureTextEntry={true}
              underlineColorAndroid='transparent'
              onChangeText={(password) => this.setState({password})}/>
        </View>

        <TouchableHighlight
          style={[styles.buttonContainer, styles.loginButton]}
            onPress={() => this.onLogin(this.state.email, this.state.password)}>
          <Text style={styles.loginText}>Login</Text>
        </TouchableHighlight>

        {/* <TouchableHighlight style={styles.buttonContainer} onPress={() => this.onClickListener('restore_password')}>
            <Text>Forgot your password?</Text>
        </TouchableHighlight> */}

        <TouchableHighlight style={styles.buttonContainer} onPress={() => this.props.navigation.navigate('Register')}>
            <Text>Register</Text>
        </TouchableHighlight>
      </View>
    );
  }

  private onClickListener = (viewId) => {
    Alert.alert('Alert', 'Button pressed ' + viewId);
  }

  private onLogin = ( p, q ) => {
    auth.doSignInWithEmailAndPassword(p, q)
      .then((authUser) => {
        this._signInAsync(authUser, p);
        // console.log(authUser);
      })
      .catch((error) => {
        Alert.alert(error.message);
      });
  }

  private _signInAsync = async ( p, q ) => {
    await AsyncStorage.setItem('userToken', p.user.uid);
    db._saveUserProfile(p.user.uid, q);
    this.props.store.user.uid = p.user.uid;
    this.props.navigation.navigate('Home');
  }

}

export default Screen;

const styles: any = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f1f8e9',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputContainer: {
    borderBottomColor: '#F5FCFF',
    backgroundColor: '#FFFFFF',
    borderRadius: 30,
    borderBottomWidth: 1,
    width: 250,
    height: 45,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputs: {
      height: 45,
      marginLeft: 16,
      borderBottomColor: '#FFFFFF',
      flex: 1,
  },
  inputIcon: {
    width: 30,
    height: 30,
    marginLeft: 15,
    justifyContent: 'center',
  },
  buttonContainer: {
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    width: 250,
    borderRadius: 30,
  },
  loginButton: {
    backgroundColor: '#00b5ec',
  },
  loginText: {
    color: 'white',
  },
  imageContainer: {
    marginBottom: 20,
    padding: 10,
  },
  imageLogo: {
    width: 350,
    height: 250,
  },
});
