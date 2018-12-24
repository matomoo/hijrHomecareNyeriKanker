import React from 'react';
import { createStackNavigator, createBottomTabNavigator, getActiveChildNavigationOptions } from 'react-navigation';
import { observer } from 'mobx-react/native';
import { colors } from '../../utils/Styles';
import Icon from 'react-native-vector-icons/FontAwesome';

import IntroScreen from '../screen/Intro';
import NotFoundScreen from '../screen/NotFound';
import Home from '../screen/Home';
import Setting from '../screen/Settings/Setting';
import UserProfile from '../screen/Users/UserProfile';
import InputUserProfile from '../screen/Users/InputUserProfile';
import InputKonfirmasiDeposit from '../screen/Users/InputKonfirmasiDeposit';
import DetailKonfirmasiDeposit from '../screen/Admin/DetailKonfirmasiDeposit';
import DetailRequestVisit from '../screen/Admin/DetailRequestVisit';
import DetailStatusVisit from '../screen/Admin/DetailStatusVisit';
import Terms from '../screen/Terms';
import AutheLoading from '../screen/authe/AutheLoading';
import LayananHomecare from '../screen/Users/LayananHomecare';
import AppLoader from '../screen/AppLoader';
import PilihanObat from '../screen/Users/PilihanObat';

// Set here for tabNavigator content
const BottomTabNavigator = createBottomTabNavigator(
  {
    Home: { screen: Home,
      navigationOptions: {
        tabBarLabel: 'Home',
        tabBarIcon: (() => (<Icon name='home' size={30}/>) ),
        tabBarVisible: true,
        // title: 'Dzikr App', // setting header title on its screen
      },
    },
    Intro: { screen: UserProfile,
      navigationOptions: () => ({
        tabBarLabel: 'Profil',
        tabBarIcon: (() => (<Icon name='user-md' size={30}/>) ),
        tabBarVisible: true,
        // title: 'Intro',
        // headerBackTitle: null,
      }),
    },
  },
);

const routeConfig = {
  BottomTabNavigator: {
    screen: BottomTabNavigator,
    navigationOptions: ({ navigation, screenProps }) => {
      const childOptions = getActiveChildNavigationOptions(navigation, screenProps);
      return {
        title: childOptions.title,
      };
    },
  },
  NotFound: {
    screen: NotFoundScreen,
    path: 'NotFound',
    navigationOptions: () => ({
      title: 'Not Found',
      // headerBackTitle: null,
    }),
  },
  // Home: { screen: Home,
  //   path: 'Home',
  //   navigationOptions: {
  //     title: 'Dzikr App',
  //   },
  // },
  Setting: { screen: Setting,
    path: 'Setting',
    navigationOptions: {
      title: 'Setting',
    },
  },
  InputUserProfile: { screen: InputUserProfile,
    path: 'InputUserProfile',
    // navigationOptions: {
    //   title: 'Input Konfirmasi Deposit',
    // },
  },
  InputKonfirmasiDeposit: { screen: InputKonfirmasiDeposit,
    path: 'InputKonfirmasiDeposit',
    // navigationOptions: {
    //   title: 'Input Konfirmasi Deposit',
    // },
  },
  DetailKonfirmasiDeposit: { screen: DetailKonfirmasiDeposit,
    path: 'DetailKonfirmasiDeposit',
    // navigationOptions: {
    //   title: 'Input Konfirmasi Deposit',
    // },
  },
  DetailRequestVisit: { screen: DetailRequestVisit,
    path: 'DetailRequestVisit',
    // navigationOptions: {
    //   title: 'Input Konfirmasi Deposit',
    // },
  },
  DetailStatusVisit: { screen: DetailStatusVisit,
    path: 'DetailStatusVisit',
    // navigationOptions: {
    //   title: 'Input Konfirmasi Deposit',
    // },
  },
  Terms: { screen: Terms,
    path: 'Terms',
    // navigationOptions: {
    //   title: 'Input Konfirmasi Deposit',
    // },
  },
  AutheLoading: { screen: AutheLoading,
    path: 'AutheLoading',
    // navigationOptions: {
    //   title: 'Input Konfirmasi Deposit',
    // },
  },
  LayananHomecare: { screen: LayananHomecare,
    path: 'LayananHomecare',
    // navigationOptions: {
    //   title: 'Input Konfirmasi Deposit',
    // },
  },
  AppLoader: { screen: AppLoader,
    path: 'AppLoader',
    // navigationOptions: {
    //   title: 'Input Konfirmasi Deposit',
    // },
  },
  PilihanObat: { screen: PilihanObat,
    path: 'PilihanObat',
    // navigationOptions: {
    //   title: 'Input Konfirmasi Deposit',
    // },
  },
};

const navigatorConfig = {
  initialRouteName: 'BottomTabNavigator',
  // header: null,
  // gesturesEnabled: true,
  // statusBarStyle: 'light-content',
  navigationOptions: {
    headerStyle: {
      // headerBackTitle: null,
      backgroundColor: '#79b700',
      borderBottomColor: 'transparent',
      borderBottomWidth: 1,
      elevation: 1,
    },
    // title: 'Dzikr App',
    headerMode: 'screen',
    headerTitleStyle: { color: '#e4ff54' },
    // headerTintColor: 'white',
  },
};

const RootStackNavigator = createStackNavigator(routeConfig, navigatorConfig);

interface IProps {
  navigation: any;
}

@observer
class RootNavigator extends React.Component<IProps> {
  private static router = RootStackNavigator.router;

  public render() {
    return (
      <RootStackNavigator
        navigation={this.props.navigation}
      />
    );
  }
}

export default RootNavigator;
