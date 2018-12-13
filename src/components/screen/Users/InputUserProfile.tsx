import React, { Component } from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Image,
  Text,
  View,
  TouchableHighlight,
  TextInput,
} from 'react-native';
import styles from '../Styles/template1';
import { db } from '../../../firebase';

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

class Screen extends Component<IProps, IState> {
  public static navigationOptions = {
    title: 'Input User Profile',
  };

  constructor(props) {
    super(props);
    this.state = {
      email : '',
      namaLengkap : '',
      handphone : '',
      alamat : '',
    };
  }

  public render() {
    return (
      <View style={styles.container}>
        {/* <View style={styles.inputContainer}>
          <Text>Email Address</Text>
          <TextInput style={styles.inputs}
              placeholder='Email'
              keyboardType='email-address'
              underlineColorAndroid='transparent'
              onChangeText={(email) => this.setState({email})}/>
        </View> */}
        {/* <View style={styles.card2}><Text >User Profile</Text></View> */}

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
    );
  }

  public _onSubmit() {
    console.log(this.state.namaLengkap, this.state.alamat);
    db._saveUserProfile(this.state.namaLengkap);
  }
}

export default Screen;
