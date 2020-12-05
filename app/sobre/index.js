import React, {Component} from 'react';
import {Text, StyleSheet, View, Linking, TouchableOpacity} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {BannerAd, BannerAdSize, TestIds} from '@react-native-firebase/admob';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {getAppVersion} from '../utils';

const adUnitId = __DEV__
  ? TestIds.BANNER
  : 'ca-app-pub-1108301984584372/1075909801';

export default class index extends Component {
  render() {
    return (
      <SafeAreaView style={styles.safeViewContainer}>
        <View style={styles.container}>
          <View style={styles.header}>
            <TouchableOpacity
              onPress={() => this.props.navigation.goBack()}
              style={styles.headerSpacing}>
              <Icon name="arrow-left" color="#000" size={25} />
            </TouchableOpacity>
            <Text style={styles.titulo}> Beba Água - Lembrete </Text>
          </View>

          <Text style={styles.version}>{getAppVersion()}</Text>
          <Text style={styles.texto}>
            O aplicativo Beba Água foi criado com o intuíto de ser um lembrete
            simples sobre água, que irá motivá-lo a beber regularmente a
            quantidade certa. Se por diversos motivos durante o dia você não
            beber água o suficiente, este e o aplicativo ideal para criar
            hábitos saúdaveis e se manter hidratado de forma correta. Após a
            instalação o app irá sugerir uma quantidade de aguá para consumo que
            deverá ser sua meta diária. Porém a mesma pode ser adaptada às suas
            necessidades para uma melhor comodidade.
          </Text>
          <Text
            style={styles.creditos}
            onPress={() => Linking.openURL('https://markwareco.com')}>
            Todos os direitos reservados à Markware Company
          </Text>
          <View style={styles.adsBannerContainer}>
            <BannerAd
              unitId={adUnitId}
              size={BannerAdSize.ADAPTIVE_BANNER}
              requestOptions={{
                requestNonPersonalizedAdsOnly: true,
              }}
            />
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  safeViewContainer: {
    flex: 1,
  },
  container: {
    padding: 20,
    flex: 1,
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerSpacing: {
    width: 30,
  },
  titulo: {
    margin: 20,
    fontSize: 30,
    fontWeight: 'bold',
  },
  texto: {
    fontSize: 18,
    marginVertical: 10,
    textAlign: 'justify',
  },
  version: {
    fontSize: 14,
    marginVertical: 10,
    textAlign: 'center',
  },
  creditos: {
    fontSize: 16,
    color: 'blue',
    marginTop: 10,
    marginBottom: 30,
    textAlign: 'justify',
  },
});
