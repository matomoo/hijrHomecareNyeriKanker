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
  store: any;
}

interface IState {
  isLoggingIn: boolean;
  switch1Value;
  switch2Value;
  switch3Value;
}

@inject('store') @observer
class Screen extends Component<IProps, IState> {

  constructor(props) {
    super(props);
    this._bootstrapAsync();
    // this._fetchData();
    this.state = {
      isLoggingIn: false,
      switch1Value: '',
      switch2Value: '',
      switch3Value: '',
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
    // This will switch to the App screen or Auth screen and this loading
    // screen will be unmounted and thrown away.
    this.props.navigation.navigate(userToken ? 'App' : 'Auth');
    // const userSetting = await AsyncStorage.getItem('userSetting');
    // const a = userSetting === null ? '{"s1":true,"s2":true,"s3":true}' : userSetting;
    // this.props.store.userSetting.asyncUserSetting = a;
    // this.props.navigation.navigate('App');
  }
}

export default Screen;
