import React, { Component } from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Image,
  Text,
  View,
  Switch,
  AsyncStorage,
} from 'react-native';

import { ratio, colors } from '../../../utils/Styles';
import { observer } from 'mobx-react';
import { inject } from 'mobx-react/native';

interface IProps {
  navigation?: any;
  store: any;
}

interface IState {
  // isLoggingIn: boolean;
  isLoading;
  switch1Value;
  switch2Value;
  switch3Value;
}

@inject('store') @observer
class Screen extends Component<IProps, IState> {
  public static navigationOptions = {
    title: 'Setting',
  };

  constructor(props) {
    super(props);
    this.state = {
      isLoading: '',
      switch1Value: '',
      switch2Value: '',
      switch3Value: '',
    };
  }

  public componentDidMount() {
    this._fetchData();
  }

  public async _fetchData() {
    const userSetting = await AsyncStorage.getItem('userSetting');
    const a1 = userSetting === null ? '{"s1":true,"s2":true,"s3":true}' : userSetting;
    const a = JSON.parse(a1);
    this.setState({
      switch1Value: a.s1,
      switch2Value: a.s2,
      switch3Value: a.s3,
    });
    // console.log('get', a);
    // this.forceUpdate();
  }

  public toggleSwitch1 = (value) => {
    this.setState({
      switch1Value: value,
    });
    this._saveIt(!this.state.switch1Value, this.state.switch2Value, this.state.switch3Value );
    // console.log('Switch 1 is: ' + value);
  }

  public toggleSwitch2 = (value) => {
    this.setState({switch2Value: value});
    this._saveIt(this.state.switch1Value, !this.state.switch2Value, this.state.switch3Value );
    // console.log('Switch 2 is: ' + value);
  }

  public toggleSwitch3 = (value) => {
    this.setState({switch3Value: value});
    this._saveIt(this.state.switch1Value, this.state.switch2Value, !this.state.switch3Value );
    // console.log('Switch 3 is: ' + value);
  }

  public _saveIt = (p, q, r) => {
    const a = JSON.stringify({
                  s1: p,
                  s2: q,
                  s3: r,
                });
    // console.log('set', a);
    this._settingAsync(a);
    this.props.store.userSetting.asyncUserSetting = a;
    console.log('setting', this.props.store.userSetting.asyncUserSetting);
  }

  public _settingAsync = async ( p) => {
    await AsyncStorage.setItem('userSetting', p);
    // this.props.navigation.navigate('Home');
  }

  public render() {
    return (
      <View style={styles.container}>
        <View style={styles.card1}>
          <Text>Umum</Text>
        </View>
        <View style={styles.card1}>
          <Text style={styles.itemLeft}>
            Lihat transliteration
          </Text>
          <Switch
            style={styles.itemRight}
            onValueChange={this.toggleSwitch1}
            value={this.state.switch1Value}/>
        </View>
        <View style={styles.card1}>
          <Text style={styles.itemLeft}>
            Lihat translation
          </Text>
          <Switch
            style={styles.itemRight}
            onValueChange={this.toggleSwitch2}
            value={this.state.switch2Value}/>
        </View>
        <View style={styles.card1}>
          <Text style={styles.itemLeft}>
            Lihat referensi hadits
          </Text>
          <Switch
            style={styles.itemRight}
            onValueChange={this.toggleSwitch3}
            value={this.state.switch3Value}/>
        </View>
      </View>
    );
  }
}

export default Screen;

const styles: any = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    // padding: 20,
  },
  card1: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    justifyContent: 'space-between',
    padding: 30,
    borderBottomColor: '#CFD8DC',
    borderBottomWidth: 1,
    flexGrow: 0,
  },
  itemLeft: {
    flexGrow: 1,
    marginLeft: 10,
  },
  itemRight: {
    width: 50,
  },
});
