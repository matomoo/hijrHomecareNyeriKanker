import React, { Component } from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Image,
  Text,
  View,
  ActivityIndicator,
  AsyncStorage,
  StatusBar,
} from 'react-native';
import { ratio, colors } from '../../../utils/Styles';
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import { inject } from 'mobx-react/native';
import { db } from 'src/firebase';
import * as db1 from '../../../firebase/firebase';

interface IProps {
  navigation?: any;
  store: any;
}

interface IState {
  isLoggingIn: boolean;
}

@inject('store') @observer
class Screen extends Component<IProps, IState> {

  constructor(props) {
    super(props);
    this._bootstrapAsync();
    this.state = {
      isLoggingIn: false,
    };
  }

  public render() {
    return (
      <View style={styles.container}>
        <ActivityIndicator />
        <StatusBar barStyle='default' />
      </View>
    );
  }

  // Fetch the token from storage then navigate to our appropriate place
  private _bootstrapAsync = async () => {
    const userToken = await AsyncStorage.getItem('userToken');
    if (userToken) {
      this.props.store.user.uid = userToken;
      db1.db.ref(`users/${userToken}`).once('value')
        .then((el) => {
          this.props.store.user.userRole = el.val().role;
          this.props.store.user.userNamaLengkap = el.val().namaLengkap;
        });
    //   const a = db1.db.ref(`users/${userToken}`);
    //   // console.log(a);
    //   this._getFirstData(a);
    }
    this.props.navigation.navigate(userToken ? 'App' : 'Auth');
  }

  // private async _getFirstData( p ) {
  //   await p.once('value')
  //     .then((result) => {
  //       const r1 = [];
  //       r1.push(result.val());
  //       this.setState({
  //         users: r1,
  //         // isLoaded: false,
  //       });
  //       // console.log(r1);
  //       // console.log(this.state.users);
  //     }).catch((err) => {
  //       console.log(err);
  //   });
  // }

}

export default Screen;

const styles: any = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    flexDirection: 'column',
    alignItems: 'center',
  },
});
