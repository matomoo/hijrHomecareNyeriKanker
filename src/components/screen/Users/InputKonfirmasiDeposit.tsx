import React, { Component } from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Image,
  Text,
  View,
  TouchableHighlight,
  TextInput,
  DatePickerAndroid,
  ScrollView,
} from 'react-native';
import styles from '../Styles/template1';
import { db } from '../../../firebase';
import * as db1 from '../../../firebase/firebase';
import { observer } from 'mobx-react';
import { inject } from 'mobx-react/native';
import moment from 'moment';

interface IProps {
  navigation?: any;
  store?: any;
}

interface IState {
  tanggalTransfer;
  namaPengirim;
  bankPengirim;
  handphonePengirim;
  jumlahTransfer;
}

@inject('store') @observer
class Screen extends Component<IProps, IState> {
  public static navigationOptions = {
    title: 'Konfirmasi Deposit',
  };
  private taskDeposit: any;

  constructor(props) {
    super(props);
    // this.taskDeposit = db1.db.ref(`users/${this.props.store.user.uid}/deposit`);
    this.state = {
      tanggalTransfer: moment(Date.now()).format('DD/MM/YYYY'),
      namaPengirim : '',
      bankPengirim: '',
      handphonePengirim : '',
      jumlahTransfer: '',
    };
  }

  // public componentDidMount() {
  //   // this.getFirstData(this.taskDeposit);
  // }

  public render() {
    return (
      <ScrollView>
          <View style={styles.container}>

          <View style={[styles.card1]}>
            <Text style={styles.itemLeft}>Tanggal Transfer</Text>
            <TouchableHighlight
              style={[styles.buttonContainer, styles.loginButton]}
                onPress={() => this._onDateTap()}
            >
              <Text style={styles.loginText}>{ this.state.tanggalTransfer }</Text>
            </TouchableHighlight>
          </View>

          <View style={styles.card1}>
            <Text style={styles.itemLeft}>Nama Pengirim</Text>
            <TextInput style={styles.itemRight}
                underlineColorAndroid='transparent'
                onChangeText={(namaPengirim) => this.setState({namaPengirim})}/>
          </View>

          <View style={styles.card1}>
            <Text style={styles.itemLeft}>Bank Pengirim</Text>
            <TextInput style={styles.itemRight}
                underlineColorAndroid='transparent'
                onChangeText={(bankPengirim) => this.setState({bankPengirim})}/>
          </View>

          <View style={styles.card1}>
            <Text style={styles.itemLeft}>Handphone Pengirim</Text>
            <TextInput style={styles.itemRight}
                keyboardType='number-pad'
                // placeholder='Nama Lengkap'
                underlineColorAndroid='transparent'
                onChangeText={(handphonePengirim) => this.setState({handphonePengirim})}/>
          </View>

          <View style={styles.card1}>
            <Text style={styles.itemLeft}>Jumlah Transfer</Text>
            <TextInput style={styles.itemRight}
                keyboardType='number-pad'
                // placeholder='Nama Lengkap'
                underlineColorAndroid='transparent'
                onChangeText={(jumlahTransfer) => this.setState({jumlahTransfer})}/>
          </View>

          <View style={styles.card2}>
            <TouchableHighlight
              style={[styles.buttonContainer, styles.loginButton]}
                onPress={() => this._onSubmit()}
            >
              <Text style={styles.loginText}>Submit</Text>
            </TouchableHighlight>
          </View>
        </View>
      </ScrollView>
    );
  }

  private _onSubmit() {
    const q = db1.db.ref(`users/${this.props.store.user.uid}/deposit`).push();
    db1.db.ref(`users/${this.props.store.user.uid}/deposit/${q.key}`).update({
      _id: q.key,
      tanggalTransfer: this.state.tanggalTransfer,
      namaPengirim: this.state.namaPengirim,
      bankPengirim: this.state.bankPengirim,
      handphonePengirim: this.state.handphonePengirim,
      jumlahTransfer: this.state.jumlahTransfer,
      statusVerifikasi: 'nok',
    });
    db1.db.ref(`users/${this.props.store.user.uid}`).update({
      statusDeposit: 'Menunggu verifikasi',
      saldoDeposit: parseInt(this.state.jumlahTransfer, 10)
                      + parseInt(this.props.navigation.state.params.qey.el.saldoDeposit, 10),
    });
    db1.db.ref(`deposit/konfirmasi/${q.key}`).update({
      _id: q.key,
      uid: this.props.store.user.uid,
      namaLengkap: this.props.store.user.userNamaLengkap,
    });
    this.props.navigation.navigate('Home');
  }

  private async _onDateTap() {
    try {
      const {action, year, month, day} = await DatePickerAndroid.open({
        // date: new Date(2020, 4, 25)
        date: new Date(),
      });
      if (action !== DatePickerAndroid.dismissedAction) {
        this.setState({ tanggalTransfer : `${day}/${month + 1}/${year}` });
      }
    } catch ({code, message}) {
      console.warn('Cannot open date picker', message);
    }
  }

}

export default Screen;
