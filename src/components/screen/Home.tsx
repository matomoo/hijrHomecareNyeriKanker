import React, { Component } from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Image,
  Text,
  View,
  Button,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { observer } from 'mobx-react';
import { inject } from 'mobx-react/native';

import CpUsers from './Users/CpUsers';
import CpDeposit from './Users/CpDeposit';
// import CpKonfirmasiDeposit from './Admin/CpKonfirmasiDeposit';
import CpAdminIndex from './Admin/Index';

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
      // <ScrollView>
        <View style={styles.container}>
          {/* <ActivityIndicator /> */}
          { this.props.store.user.userRole === 'user' &&
            <CpUsers navigation={ this.props.navigation } />}
          { this.props.store.user.userRole === 'admin' &&
            <View style={styles.container}>
              <CpAdminIndex navigation={ this.props.navigation } />
            </View>
          }
        </View>
      // </ScrollView>
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
    width: '100%',
    // padding: 10,
  },
});
