import React, { Component } from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Image,
  Text,
  View,
  Button,
} from 'react-native';
import { observer } from 'mobx-react';
import { inject } from 'mobx-react/native';

import CpUsers from './Users/CpUsers';
import CpDeposit from './Users/CpDeposit';

interface IProps {
  navigation?: any;
  store?: any;
}

interface IState {
  isLoaded: boolean;
  // users: any;
}

@inject('store') @observer
class Screen extends Component<IProps, IState> {
  public static navigationOptions = {
    title: 'Homecare Nyeri Kanker dan Paliatif',
  };

  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
    };
  }

  public render() {
    return (
      <View style={styles.container}>
        { this.props.store.user.userRole === 'user' &&
          <CpUsers navigation={ this.props.navigation } />}

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
    alignItems: 'center',
    justifyContent: 'flex-start',
    // padding: 10,
  },
});
