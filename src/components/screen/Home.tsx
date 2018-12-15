import React, { Component } from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Image,
  Text,
  View,
  Button,
} from 'react-native';

import { ratio, colors } from '../../utils/Styles';
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

class Screen extends Component<IProps, IState> {
  public static navigationOptions = {
    title: 'Home',
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
        <CpUsers navigation={ this.props.navigation } />
        {/* <CpDeposit navigation={ this.props.navigation }/> */}
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
