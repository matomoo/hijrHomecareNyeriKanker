import React, { Component } from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Image,
  Text,
  View,
  ScrollView,
  Button,
  // AsyncStorage,
} from 'react-native';
import Terms from '../screen/AppsData/AppsTerms';
import { ratio, colors } from '../../utils/Styles';
import * as db1 from '../../firebase/firebase';
import { observer } from 'mobx-react';
import { inject } from 'mobx-react/native';

interface IProps {
  navigation?: any;
  store?: any;
}

interface IState {
  // isLoggingIn: boolean;
  email;
  password;
}

@inject('store') @observer
class Screen extends Component<IProps, any> {
  public static navigationOptions = {
    title: 'Hak dan Kewajiban Konsumen',
  };

  constructor(props) {
    super(props);
    // this.state = {
    // };
  }

  public render() {
    return (
      <View style={styles.container}>
        <ScrollView>
        <Text style={[{fontWeight: 'bold'}]}>Berikut Hak Anda sebagai konsumen pengguna layanan
          <Text style={[{fontWeight: '900'}]}> Homecare Nyeri Kanker dan Paliatif</Text></Text>
        <Text>1. Memperoleh informasi tentang hak konsumen homecare dan kewajiban sebagai pengguna layanan.</Text>
        <Text>2. Anda berhak untuk mendapatkan pelayanan professional sesuai dengan standar pelayanan yang ditetapkan.
           Tidak membeda-bedakan ras, golongan, agama, suku, budaya.</Text>
        <Text>3. Anda dapat ikut berpartisipasi dalam rencana pelayanan atau pun perawatan homecare yang akan
           diberikan.</Text>
        <Text>4. Memperoleh perawatan terbaik dari pelaksana pelayanan yang melayani dimana jelas identitasnya meliputi
           nama dan jabatan mereka masing-masing.</Text>
        <Text>5. Mendapat catatan perkembangan atau progress perbaikan kondisi selama perawatan terkini akan kondisi
           pasien secara rahasia.</Text>
        <Text>6. Anda berhak untuk menolak tindakan, prosedur atau tindakan medis setelah mendapatkan infomasi yang
           lengkap tentang akibat dari suatu tindakan.</Text>
        <Text>7. Pelayanan wajib diberikan secara layak dan semestinya sesuai dengan kode etik kedokteran dan
           keperawatan.</Text>
        <Text>8. Anda memiliki hak untuk mendapat dokter atau perawat pengganti apabila petugas yang telah diberikan
           tidak sesuai harapan ataupun kurang berkenan menurut pasien sebanyak 1 kali penggantian.</Text>
        <Text>9. Perubahan layanan, penjadwalan kunjungan, libur perawat, tindakan tambahan perlu diinformasikan
           secara jelas baik lisan maupun tulisan segera mungkin.</Text>
        <Text>10. Anda berhak mengajukan komplain pada penyelenggara. Hak konsumen homecare khususnya komplain dapat
           disampaikan langsung kepada petugas ataupun penyelenggara bila terjadi ketidaksesuaian antara hak dan
           kewajiban.</Text>
        <Text />
        <Text style={[{fontWeight: 'bold', color: 'red'}]}>Anda Tidak Diperkenankan</Text>
        <Text>1.  Menambah layanan perawatan tanpa adanya konfirmasi kepada penyelenggara diluar layanan yang telah
           ditetapkan.</Text>
        <Text>2.  Anda memberikan tugas tambahan seperti pekerjaan rumah tangga kepada tim perawatan. Mengingat Job
           desk dan wewenang peugas adalah tenaga kesehatan profesional.</Text>
        <Text>3.  Melakukan intimidasi berhubungan dengan Ras, suku, agama, keyakinan kepada petugas kami.</Text>
        <Text>4.  Tidak memenuhi administrasi perawatan yang telah ditentukan sesuai dengan layanan.</Text>
        <Text />
        <Text style={[{fontWeight: 'bold'}]}>Kewajiban pasien</Text>
        <Text>Melakukan pembayaran <Text style={[{fontWeight: 'bold'}]}>minimum payment sebesar 50 ribu</Text>
            , melalui transfer, atau sms banking ke nomor
           rekening <Text style={[{fontWeight: '900'}]}>BNI 0111028895 atas nama Rektor Unhas qq Rumah Sakit
            Universitas Hasanuddin</Text>. Jika setelah pihak
           RS Unhas melakukan kunjungan dan melakukan layanan sesuai order, maka pasien melakukan pembayaran lunas
           melalui transfer, atau sms banking, atau cash tunai. <Text style={[{fontWeight: 'bold', color: '#388e3c'}]}>
            Namun jika pada
            saat kunjungan kami menilai bahwa pasien yang dikunjungi adalah pasien tidak mampu, maka pihak rumah
             sakit unhas akan memberikan kebijakan, bisa berupa gratis pembiayaan dengan pengembalian minimum
              payment, atau memberikan discount khusus.</Text></Text>
        <Text />
        <Button title='SAYA SETUJU'
            onPress={() => this._onAgree()}
            // disabled={true}
        />
        <Text />
        <Button title='SAYA TIDAK SETUJU'
            onPress={() => this._onDisagree()}
            color='#ef5350'
        />
        </ScrollView>
      </View>
    );
  }

  private async _onAgree() {
    db1.db.ref('users/' + this.props.store.user.uid).update({
      userTerms: 'ok',
    });
    this.props.navigation.navigate('Home');
  }

  private async _onDisagree() {
    db1.db.ref('users/' + this.props.store.user.uid).update({
      userTerms: 'nok',
    });
    this.props.navigation.navigate('Login');
  }
}

export default Screen;

const styles: any = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    flexDirection: 'column',
    alignItems: 'center',
    padding: 10,
    margin: 10,
    fontSize: 22,
    borderColor: '#4caf50',
    borderWidth: 2,
    borderRadius: 15,
  },
});
