import React, { Component } from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Image,
  Text,
  View,
  AsyncStorage,
  Button,
  ScrollView,
} from 'react-native';
import * as db1 from '../../../firebase/firebase';
import styles from '../Styles/template1';
import { observer } from 'mobx-react';
import { inject } from 'mobx-react/native';
import { auth, db } from '../../../firebase';

interface IProps {
  navigation?: any;
  store?: any;
}

interface IState {
  // isLoggingIn: boolean;
  isLoaded;
  users;
  email;
  password;
}

@inject('store') @observer
class Screen extends Component<IProps, IState> {
  public static navigationOptions = {
    title: 'User Profile',
  };

  private taskUser: any;

  constructor(props) {
    super(props);
    this.taskUser = db1.db.ref(`users/${this.props.store.user.uid}`);
    this.state = {
      isLoaded: false,
      email: '',
      password: '',
      users: [],
    };
  }

  public componentDidMount() {
    this.getFirstData(this.taskUser);
  }

  public render() {
    return (
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.container}>
            <View style={styles.card3}>
              { this.state.users.map( (el, key) =>
                <View key={key}>
                  <Text style={styles.textInfo}>Nama Lengkap : { el.namaLengkap }</Text>
                  <Text style={styles.textInfo}>Handphone : { el.handphone }</Text>
                  <Text style={styles.textInfo}>Alamat : { el.alamat }</Text>
                </View>,
              )}
            </View>
            <View style={styles.card1}>
              <Button title='Update User Profile'
                onPress={() => this.props.navigation.navigate('InputUserProfile')} />
            </View>
            <View style={styles.card1}>
              <Button title='Ubah User Password'
                onPress={() => this.props.navigation.navigate('UserChangePassword')} />
            </View>
          </View>
          <View style={styles.card1}>
            <Button title='Logout'
              onPress={() => this._onLogout()} />
          </View>
        </View>
      </ScrollView>
    );
  }

  private async getFirstData( p ) {
    await p.on('value', (result) => {
      const r1 = [];
      r1.push(result.val());
      this.setState({
        users: r1,
        isLoaded: false,
      });
    });
  }

  private _onLogout = async () => {
    await AsyncStorage.clear();
    auth.doSignOut();
    this.props.navigation.navigate('Auth');
  }

}

export default Screen;
