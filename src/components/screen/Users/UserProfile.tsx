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

import { ratio, colors } from '../../../utils/Styles';

const styles: any = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    flexDirection: 'column',
    alignItems: 'center',
  },
});

class Screen extends Component<any, any> {
  public static navigationOptions = {
    title: 'User Profile',
  };

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  public render() {
    return (
      <View style={styles.container}>
        <Text>Logout</Text>
        <Button title='Logout'
          onPress={() => this._onLogout()}
        />
      </View>
    );
  }

  private _onLogout = async () => {
    await AsyncStorage.clear();
    this.props.navigation.navigate('Auth');
  }
}

export default Screen;
