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
  Platform,
} from 'react-native';
import styles from '../Styles/template1';
import { db } from '../../../firebase';
import * as db1 from '../../../firebase/firebase';
import { observer } from 'mobx-react';
import { inject } from 'mobx-react/native';
import moment from 'moment';
import ImagePicker from 'react-native-image-picker';
import firebase from 'firebase';
import RNFetchBlob from 'rn-fetch-blob';
import Moment from 'moment';
import RNFS from 'react-native-fs';

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
  buktiBayar;
}

@inject('store') @observer
class Screen extends Component<IProps, IState> {
  public static navigationOptions = {
    title: 'Konfirmasi Pembayaran',
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
      buktiBayar: 'assets:/thumbnail-bukti.png',
    };
  }

  // public componentDidMount() {
  //   // this.getFirstData(this.taskDeposit);
  // }

  public render() {
    return (
      <ScrollView>
          <View style={styles.container}>
          <View style={styles.card4}>
            <Text style={styles.largeTextInfo}>Informasi Rekening Transfer Pembayaran</Text>
            <Text style={styles.largeTextInfo}>Bank BNI</Text>
            <Text style={styles.largeTextInfo}>Nomor rekening : 111 028 895</Text>
            <Text style={styles.largeTextInfo}>Atas nama : Rektor Unhas QQ RS Unhas</Text>
          </View>
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

          <View style={styles.card3}>
            <Text style={styles.itemLeft}>Screenshot Bukti Bayar</Text>
            <TouchableOpacity
              onPress={() => this._onPressAva5()}
              >
              <Image style={styles.avatar}
                source={{uri: this.state.buktiBayar }}/>
            </TouchableOpacity>
          </View>

          <View style={styles.card2}>
            <TouchableOpacity
              style={[styles.buttonContainer, styles.loginButton]}
                onPress={() => this._onSubmit()}
            >
              <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity>
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
      ssBuktiBayar: this.state.buktiBayar,
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

  private _onPressAva5() {
    const options = {
      title: 'Select Avatar',
      // customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    ImagePicker.showImagePicker(options, (response) => {
      // console.log('filesize', response.type, response.fileSize);
      const image = response.uri;
      const dbRef = firebase.storage().ref('users/' + this.props.store.user.uid + '/images/deposit/bukti.jpg');

      const Blob = RNFetchBlob.polyfill.Blob;
      const fs = RNFetchBlob.fs;
      window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest;
      window.Blob = Blob;

      const uploadImage = (uri, fbRef, mime = 'image/jpg') => {
        return new Promise((resolve, reject) => {
          const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri;
          let uploadBlob = null;
          // const imageRef = firebase.storage().ref('posts').child(imageName);
          const imageRef = fbRef;
          fs.readFile(uploadUri, 'base64')
            .then((data) => {
              return Blob.build(data, { type: `${mime};BASE64` });
            })
            .then((blob) => {
              uploadBlob = blob;
              return imageRef.put(blob, { contentType: mime });
            })
            .then(() => {
              uploadBlob.close();
              return imageRef.getDownloadURL();
            })
            .then((url) => {
              resolve(url);
              // console.log(url);
            })
            .catch((error) => {
              reject(error);
            });
        });
      };

      uploadImage(image, dbRef)
        .then((res) => {
          // console.log(res);
          // db1.db.ref('users/' + this.props.store.user.uid).update({
          //   ssBuktiBayar: res,
          // });
          this.setState({ buktiBayar: res });
        })
        .catch((err) => {
          console.log(err);
        })
      ;
    });
  }

}

export default Screen;
