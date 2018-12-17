import React, { Component } from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Image,
  Text,
  View,
  TouchableHighlight,
  TextInput,
  ScrollView,
} from 'react-native';
import styles from '../Styles/template1';
import { db } from '../../../firebase';
import * as db1 from '../../../firebase/firebase';
import { observer } from 'mobx-react';
import { inject } from 'mobx-react/native';

interface IProps {
  navigation?: any;
  store?: any;
}

interface IState {
  email;
  namaLengkap;
  handphone;
  alamat;
}

@inject('store') @observer
class Screen extends Component<IProps, IState> {
  public static navigationOptions = {
    title: 'Input User Profile',
  };
  private taskUser: any;

  constructor(props) {
    super(props);
    this.taskUser = db1.db.ref(`users/${this.props.store.user.uid}`);
    this.state = {
      email : '',
      namaLengkap : '',
      handphone : '',
      alamat : '',
    };
  }

  // public componentDidMount() {
  //   // this.getFirstData(this.taskUser);
  // }

  public render() {
    return (
      <ScrollView>
      <View style={styles.container}>
        <View style={styles.card1}>
          <Text style={styles.itemLeft}>Nama Lengkap</Text>
          <TextInput style={styles.itemRight}
              // placeholder='Nama Lengkap'
              underlineColorAndroid='transparent'
              onChangeText={(namaLengkap) => this.setState({namaLengkap})}/>
        </View>

        <View style={styles.card1}>
          <Text style={styles.itemLeft}>Handphone</Text>
          <TextInput style={styles.itemRight}
              keyboardType='number-pad'
              // placeholder='Nama Lengkap'
              underlineColorAndroid='transparent'
              onChangeText={(handphone) => this.setState({handphone})}/>
        </View>

        <View style={styles.card3}>
          <Text style={styles.itemLeft}>Alamat</Text>
          <TextInput style={styles.itemRight2}
              // placeholder='Alamat'
              multiline={true}
              numberOfLines={4}
              underlineColorAndroid='transparent'
              onChangeText={(alamat) => this.setState({alamat})}/>
        </View>

        <View style={styles.card2}>
          <TouchableHighlight
            style={[styles.buttonContainer, styles.loginButton]}
              onPress={() => this._onSubmit()}
          >
            <Text style={styles.loginText}>Submit</Text>
          </TouchableHighlight>
        </View>
        {/* <TouchableHighlight style={styles.buttonContainer} onPress={() => this.onClickListener('restore_password')}>
            <Text>Forgot your password?</Text>
        </TouchableHighlight> */}

      </View>
      </ScrollView>
    );
  }

  public _onSubmit() {
    this.taskUser.update({
      namaLengkap: this.state.namaLengkap,
      handphone: this.state.handphone,
      alamat: this.state.alamat,
    });
  }

}

export default Screen;
