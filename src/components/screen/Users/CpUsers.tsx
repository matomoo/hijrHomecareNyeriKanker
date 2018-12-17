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
                      renderText={(value) => <Text style={styles.textInfo}>Saldo deposit : {value}</Text>} />
                  </View>
                  <View style={styles.bodyContent}>
                    <Text style={styles.smallTextInfo}>Status deposit : {el.statusDeposit}</Text>
                      { el.statusDeposit !== 'OK' &&
                      <Text style={styles.smallTextInfo}>Silahkan melakukan transfer ke rekening berikut dan
                        melakukan konfirmasi transfer, petugas kami akan melakukan
                        verifikasi setelahnya</Text>
                      }
                      <Button title=' Konfirmasi Deposit '
                        // color='#841584'
                        onPress={() => this.props.navigation.navigate('InputKonfirmasiDeposit', { qey : {el} })}
                        disabled={ el.statusDeposit === 'Menunggu verifikasi' ? true : false }
                      />
                      <Text style={styles.itemSpaceV10} />
                      <Text style={styles.smallTextInfo}>Status Request : {el.requestVisit}</Text>
                      <Button title=' Request Visit '
                        onPress={() => this._onRequest(el)}
                        disabled={ el.statusDeposit === 'OK' && el.requestVisit === 'Idle' ? false : true }
                      />
                  </View>
                </View>,
              )}
            </View>
        }
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
    //   .then((result) => {
    //     const r1 = [];
    //     r1.push(result.val());
    //     this.setState({
    //       users: r1,
    //       isLoaded: false,
    //     });
    //     // console.log(r1);
    //     // console.log(this.state.users);
    //   }).catch((err) => {
    //     console.log(err);
    // });
  }

  private _onRequest = ( p ) => {
    const url2 = 'users/' + this.props.store.user.uid + '/visit';
    const a2 = db1.db.ref(url2).push();
    db1.db.ref(url2 + '/' + a2.key).update({
      _id: a2.key,
      uid: this.props.store.user.uid,
      namaLengkap: this.props.store.user.userNamaLengkap,
      tanggalRequestVisit: Moment().format('DD/MM/YYYY'),
      alamat: p.alamat,
      handphone: p.handphone,
      requestVisit: 'Request visit',
    });
    db1.db.ref('users/' + this.props.store.user.uid).update({
      requestVisit: 'Request visit',
    });
    const url = 'homecare/visit';
    // const a = db1.db.ref(url).push();
    db1.db.ref(url + '/' + a2.key).update({
      _id: a2.key,
      uid: this.props.store.user.uid,
      namaLengkap: this.props.store.user.userNamaLengkap,
      tanggalRequestVisit: Moment().format('DD/MM/YYYY'),
      alamat: p.alamat,
      handphone: p.handphone,
      requestVisit: 'Request visit',
    });
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
    padding: 30,
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
    marginBottom: 10,
  },
  name: {
    fontSize: 22,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  bodyContent: {
    flex: 1,
    alignItems: 'center',
    padding: 30,
  },
  textInfo: {
    fontSize: 18,
    marginTop: 20,
    color: '#fff59d',
  },
  smallTextInfo: {
    fontSize: 14,
    marginBottom: 10,
    color: '#696969',
  },
  itemSpaceV10: {
    marginVertical: 10,
  },
});
