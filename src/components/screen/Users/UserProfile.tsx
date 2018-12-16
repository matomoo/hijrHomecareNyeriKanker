import React, { Component } from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Image,
  Text,
  View,
  AsyncStorage,
  Button,
} from 'react-native';
// import UpdateUserProfil from '../Users/InputKonfirmasiDeposit';
import { ratio, colors } from '../../../utils/Styles';

const styles: any = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    flexDirection: 'column',
    alignItems: 'center',
  },
});

interface IProps {
  navigation?: any;
  store?: any;
}

interface IState {
  // isLoggingIn: boolean;
  email;
  password;
}

class Screen extends Component<IProps, IState> {
  public static navigationOptions = {
    title: 'User Profile',
  };

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
  }

  public render() {
    return (
      <View style={styles.container}>
        <Text>User Profil</Text>
        <Button title='Update User Profile'
          onPress={() => this.props.navigation.navigate('InputUserProfile')} />
        <Button title='Logout'
          onPress={() => this._onLogout()} />
      </View>
    );
  }

  private _onLogout = async () => {
    await AsyncStorage.clear();
    this.props.navigation.navigate('Auth');
  }
}

export default Screen;
