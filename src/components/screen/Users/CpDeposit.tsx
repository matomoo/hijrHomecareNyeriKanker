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
  Platform,
} from 'react-native';
import { ratio, colors } from '../../../utils/Styles';
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import { inject } from 'mobx-react/native';
import * as db1 from '../../../firebase/firebase';
import RNFetchBlob from 'rn-fetch-blob';

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
      <View style={styles.container}>
        { this.state.isLoaded ?
            <ActivityIndicator /> :
            <View style={styles.header}>
              <View style={styles.headerContent}>
                <Text style={styles.textSmallInfo}>Status deposit : Saldo di bawah limit.</Text>
                <Text style={styles.textSmallInfo}>Silahkan melakukan transfer ke rekening berikut dan
                  melakukan konfirmasi transfer, petugas kami akan melakukan
                  verifikasi setelahnya</Text>
                <Button title=' Konfirmasi Deposit '
                  onPress={() => this.props.navigation.navigate('InputKonfirmasiDeposit')}
                  // disabled={true}
                />
                <Button title=' Request Homecare '
                  onPress={() => this._onRequest()}
                  disabled={true}
                />
              </View>
            </View>
        }
      </View>
    );
  }

  private _onRequest = () => {
    Alert.alert(this.props.store.user.uid);
    // this.Picturexx();
  }

  private async getFirstData( p ) {
    await p.once('value')
      .then((result) => {
        const r1 = [];
        r1.push(result.val());
        this.setState({
          users: r1,
          isLoaded: false,
        });
        // console.log(r1);
        // console.log(this.state.users);
      }).catch((err) => {
        console.log(err);
    });
  }

  // Fetch the token from storage then navigate to our appropriate place
  private _bootstrapAsync = async () => {
    // const userToken = await AsyncStorage.getItem('userToken');
    // this.props.store.user.uid = userToken;
    // This will switch to the App screen or Auth screen and this loading
    // screen will be unmounted and thrown away.
    // this.props.navigation.navigate(userToken ? 'App' : 'Auth');
    // const userSetting = await AsyncStorage.getItem('userSetting');
    // const a = userSetting === null ? '{"s1":true,"s2":true,"s3":true}' : userSetting;
    // this.props.store.userSetting.asyncUserSetting = a;
    // this.props.navigation.navigate('App');
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
    backgroundColor: 'transparent',
    // marginHorizontal: 0,
    width: '100%',
    // flexGrow: 1,
    // flex: 1,
  },
  headerContent: {
    padding: 30,
    // marginHorizontal: 0,
    alignItems: 'center',
    // width: '100%',
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
    color: '#696969',
  },
  textSmallInfo: {
    fontSize: 14,
    color: '#696969',
    marginBottom: 10,
  },
});

// export const Picturex = (uri, mime = 'application/octet-stream') => {
//   // const mime = 'image/jpg';
//   const { currentUser } = db1.auth;
//   const Blob = RNFetchBlob.polyfill.Blob;
//   const fs = RNFetchBlob.fs;
//   // window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest;
//   // window.Blob = Blob;

//   return ((resolve: any, reject: any) => {
//       const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri;
//       let uploadBlob = null;
//       const imageRef = db1.storage.ref('users').child('upload');
//       fs.readFile(uploadUri, 'base64')
//       // .then((data) => {
//       //   return Blob.build(data, { type: `${mime};BASE64` });
//       // })
//       .then((blob) => {
//         uploadBlob = blob;
//         imageRef.put(blob, { contentType : mime });
//       })
//       .then(() => {
//         // take the downloadUrl in case you want to downlaod
//         imageRef.getDownloadURL().then((url) => {
//          console.log(url);
//         });
//       });
//   });
// };
