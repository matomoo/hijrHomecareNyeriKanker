import React, { Component } from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Image,
  Text,
  View,
  ActivityIndicator,
  AsyncStorage,
  StatusBar,
  Button,
  Alert,
  ScrollView,
} from 'react-native';
import { ratio, colors } from '../../../utils/Styles';
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import { inject } from 'mobx-react/native';
import * as db1 from '../../../firebase/firebase';
import NumberFormat from 'react-number-format';
import Moment from 'moment';

interface IProps {
  navigation?: any;
  store?: any;
}

interface IState {
  isLoaded: boolean;
  users: any;
}

@inject('store') @observer
class Screen extends Component<IProps, IState> {

  private taskUser: any;

  constructor(props) {
    super(props);
    this.taskUser = db1.db.ref(`users/${this.props.store.user.uid}`);
    this.state = {
      isLoaded: true,
      users: [],
    };
  }

  public componentDidMount() {
    this.getFirstData(this.taskUser);
  }

  public render() {
    return (
      <View style={styles.topContainer}>
        <ScrollView>
        { this.state.isLoaded ?
            <ActivityIndicator /> :
            <View style={styles.container}>
              { this.state.users.map( (el, key) =>
                <View style={styles.header} key={key}>
                  <View style={styles.headerContent}>
                    <Image style={styles.avatar}
                      source={{uri: 'https://bootdey.com/img/Content/avatar/avatar1.png'}}/>
                    <Text style={styles.name}>Halo, {el.namaLengkap}</Text>
                    {/* <Text style={styles.textInfo}>Alamat {el.alamat}</Text> */}
                    <NumberFormat
                      value={el.saldoDeposit}
                      displayType={'text'} thousandSeparator={true} prefix={'Rp. '}
                      renderText={(value) => <Text style={styles.textInfo}>Saldo : {value}</Text>} />
                  </View>
                  <View style={styles.bodyContent}>
                    <Text style={styles.smallTextInfo}>Status request : {el.requestVisit}</Text>
                    <TouchableOpacity
                        style={ el.statusDeposit === 'OK' && el.requestVisit === 'Idle'  ?
                                [styles.buttonContainer, styles.loginButton] :
                                [styles.buttonContainerDisabled, styles.loginButtonDisabled] }
                        onPress={() => this._onRequest(el)}
                        disabled={ el.statusDeposit === 'OK' && el.requestVisit === 'Idle' ? false : true }
                      >
                          <Text style={ el.statusDeposit === 'OK' && el.requestVisit === 'Idle' ?
                                [styles.buttonText] :
                                [styles.buttonTextDisabled] }>Layanan Homecare</Text>
                      </TouchableOpacity>
                    {/* <Text style={styles.itemSpaceV10} /> */}

                    {/* <Text style={styles.smallTextInfo}>Status request : {el.requestVisit}</Text>
                    <TouchableOpacity
                        style={ el.statusDeposit === 'OK' && el.requestVisit === 'Idle' ?
                                [styles.buttonContainer, styles.loginButton] :
                                [styles.buttonContainerDisabled, styles.loginButtonDisabled] }
                        // onPress={() => this._onRequest(el)}
                        disabled={ el.statusDeposit === 'OK' && el.requestVisit === 'Idle' ? false : true }
                      >
                          <Text style={ el.statusDeposit === 'OK' && el.requestVisit === 'Idle' ?
                                [styles.buttonText] :
                                [styles.buttonTextDisabled] }>Layanan Beli dan Antar Obat</Text>
                      </TouchableOpacity> */}

                    {/* <Text style={styles.itemSpaceV10} /> */}
                    <Text style={styles.smallTextInfo}>Status pembayaran : {el.statusDeposit}</Text>
                      {/* { el.statusDeposit !== 'OK' &&
                      <Text style={styles.smallTextInfo}>Silahkan melakukan transfer ke rekening berikut dan
                        melakukan konfirmasi transfer, petugas kami akan melakukan
                        verifikasi setelahnya</Text>
                      } */}
                      <TouchableOpacity
                        style={ el.statusDeposit === 'Menunggu verifikasi' ?
                                [styles.buttonContainerDisabled, styles.loginButtonDisabled] :
                                [styles.buttonContainer, styles.loginButton] }
                        onPress={() => this.props.navigation.navigate('InputKonfirmasiDeposit', { qey : {el} })}
                        disabled={ el.statusDeposit === 'Menunggu verifikasi' ? true : false }
                      >
                          <Text style={ el.statusDeposit === 'Menunggu verifikasi' ?
                                [styles.buttonTextDisabled] :
                                [styles.buttonText] }>Konfirmasi Pembayaran</Text>
                      </TouchableOpacity>
                      {/* <Button title=' Konfirmasi Deposit '
                        // color='#841584'
                        onPress={() => this.props.navigation.navigate('InputKonfirmasiDeposit', { qey : {el} })}
                        disabled={ el.statusDeposit === 'Menunggu verifikasi' ? true : false }
                      /> */}
                  </View>
                </View>,
              )}
            </View>
        }
      </ScrollView>
      </View>
    );
  }

  private async getFirstData( p ) {
    await p.on('value', (result) => {
      const r1 = [];
      r1.push(result.val());
      this.setState({
        users: r1,
        isLoaded: false,
      });
    });
  }

  private _onRequest( p ) {
    // const url2 = 'users/' + this.props.store.user.uid + '/visit';
    // const a2 = db1.db.ref(url2).push();
    // db1.db.ref(url2 + '/' + a2.key).update({
    //   _id: a2.key,
    //   uid: this.props.store.user.uid,
    //   namaLengkap: this.props.store.user.userNamaLengkap,
    //   tanggalRequestVisit: Moment().format('DD/MM/YYYY'),
    //   alamat: p.alamat,
    //   handphone: p.handphone,
    //   requestVisit: 'Request visit',
    // });
    // db1.db.ref('users/' + this.props.store.user.uid).update({
    //   requestVisit: 'Request visit',
    // });
    // const url = 'homecare/visit';
    // // const a = db1.db.ref(url).push();
    // db1.db.ref(url + '/' + a2.key).update({
    //   _id: a2.key,
    //   uid: this.props.store.user.uid,
    //   namaLengkap: this.props.store.user.userNamaLengkap,
    //   tanggalRequestVisit: Moment().format('DD/MM/YYYY'),
    //   alamat: p.alamat,
    //   handphone: p.handphone,
    //   requestVisit: 'Request visit',
    // });

    this.props.navigation.navigate('LayananHomecare');
  }

}

export default Screen;

const styles: any = StyleSheet.create({
  topContainer: {
    flex: 1,
    // flexGrow: 1,
    width: '100%',
    // backgroundColor: 'yellow',
  },
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '100%',
    // marginVertical: 10,
    // marginHorizontal: 0,
    // height : 100,
    // marginTop : 10,
    // flexGrow: 1,
  },
  // card1: {
  //   flex: 1,
  //   height: 50,
  // },
  header: {
    // marginHorizontal: 0,
    width: '100%',
    // flexGrow: 1,
    flex: 1,
    // paddingVertical: 30,
    // marginHorizontal: 0,
  },
  headerContent: {
    backgroundColor: '#66bb6a',
    padding: 20,
    // paddingHorizontal: 30,
    // marginVertical: 0,
    marginHorizontal: 0,
    alignItems: 'center',
    width: '100%',
    // flex: 1,
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: 'white',
    marginBottom: 5,
  },
  name: {
    fontSize: 20,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  bodyContent: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 5,
  },
  textInfo: {
    fontSize: 18,
    marginTop: 10,
    color: '#fff59d',
  },
  smallTextInfo: {
    fontSize: 14,
    marginTop: 5,
    color: '#696969',
  },
  itemSpaceV10: {
    marginVertical: 3,
  },
  buttonContainer: {
    // height: 50,
    paddingVertical: 10,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    // width: 220,
    borderRadius: 30,
  },
  loginButton: {
    backgroundColor: '#1976d2',
  },
  buttonText: {
    fontSize: 20,
    fontWeight: 'bold',
    // marginBottom: 10,
    color: '#ffffff',
  },
  buttonContainerDisabled: {
    // height: 50,
    paddingVertical: 10,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    // width: 220,
    borderRadius: 30,
  },
  loginButtonDisabled: {
    backgroundColor: '#e0e0e0',
  },
  buttonTextDisabled: {
    fontSize: 20,
    fontWeight: 'bold',
    // marginBottom: 10,
    color: '#aeaeae',
  },
});
