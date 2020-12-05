import React, {Component} from 'react';
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import InputTime from './components/InputTime';
import {LoadingScreen} from '../utils';
import {
  BannerAd,
  BannerAdSize,
  InterstitialAd,
  AdEventType,
  TestIds,
} from '@react-native-firebase/admob';

const adUnitId = __DEV__
  ? TestIds.BANNER
  : 'ca-app-pub-1108301984584372/4120875543';

const adUnitIdInt = __DEV__
  ? TestIds.INTERSTITIAL
  : 'ca-app-pub-1108301984584372/7529637512';

const interstitial = InterstitialAd.createForAdRequest(adUnitIdInt, {
  requestNonPersonalizedAdsOnly: true,
  keywords: ['fashion', 'clothing'],
});

import NumericInput from 'react-native-numeric-input';

export default class ajustes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      startTime: 6,
      finalTime: 22,
      frequencia: 1,
    };
  }

  async onLoadInfo() {
    try {
      var _startTime = parseInt(await AsyncStorage.getItem('timeStart'), 10);
      var _finalTime = parseInt(await AsyncStorage.getItem('timeFinal'), 10);
      var _frequencia = parseInt(await AsyncStorage.getItem('frequencia'), 10);

      if (_startTime && _finalTime && _frequencia) {
        this.setState({
          startTime: _startTime,
          finalTime: _finalTime,
          frequencia: _frequencia,
          isLoading: false,
        });
        console.log('sdas');
      } else {
        this.setState({
          startTime: 6,
          finalTime: 22,
          frequencia: 2,
          isLoading: false,
        });
      }
    } catch (error) {
      console.log('Error OnLoadInfo', error);
      this.setState({
        startTime: 6,
        finalTime: 22,
        frequencia: 2,
        isLoading: false,
      });
      console.log('sadasdsa');
    }
  }

  async onSaveInfo() {
    const {startTime, finalTime, frequencia} = this.state;

    await AsyncStorage.setItem('timeStart', startTime.toString());
    await AsyncStorage.setItem('timeFinal', finalTime.toString());
    await AsyncStorage.setItem('frequencia', frequencia.toString());

    await this.iniciarLembretes();

    this.props.navigation.goBack();
  }

  async iniciarLembretes() {
    const {startTime, finalTime, frequencia} = this.state;

    this.props.notif.cancelAll();

    if (finalTime > startTime) {
      var totalHoras = finalTime - startTime;

      console.log('totalHoras', totalHoras);
      if (totalHoras > 0) {
        var FreqTime = (totalHoras / frequencia).toFixed(0);

        console.log('FreqTime', FreqTime);

        for (let index = 0; index < frequencia; index++) {
          var datetime = this.getDateTimeByHour(index * FreqTime + startTime);
          this.props.notif.scheduleNotif(datetime);
          console.log(datetime);
        }
      }
    }
    console.log('iniciar lembretes');
  }

  getDateTimeByHour(hora) {
    console.log('Hora', hora);
    var currentdate = new Date();
    // new Date('2011', '04' - 1, '11', '11', '51', '00')
    var datetime = new Date(
      currentdate.getFullYear(),
      currentdate.getMonth(),
      currentdate.getDate(),
      hora,
      '00',
      '00',
    );

    return datetime;
  }

  componentDidMount() {
    this.onLoadInfo();

    const eventListener = interstitial.onAdEvent((type) => {
      if (type === AdEventType.LOADED) {
        interstitial.show();
      }
    });

    // Start loading the interstitial straight away
    interstitial.load();

    // Unsubscribe from events on unmount
    return () => {
      eventListener();
    };
  }

  render() {
    const {startTime, finalTime, frequencia, isLoading} = this.state;
    if (isLoading) {
      return <LoadingScreen />;
    }
    return (
      <SafeAreaView style={styles.safeViewContainer}>
        <ScrollView style={styles.scroll}>
          <View style={styles.container}>
            <Text style={styles.subTitle}>Quantos copos deseja tomar?</Text>
            <NumericInput
              value={frequencia}
              onChange={(frequencia) => this.setState({frequencia})}
              onLimitReached={(isMax, msg) => console.log(isMax, msg)}
              totalWidth={250}
              totalHeight={50}
              iconSize={25}
              step={1}
              minValue={1}
              maxValue={20}
              valueType="integer"
              rounded
              textColor="#3498db"
              iconStyle={{color: 'white'}}
              containerStyle={{marginTop: 10}}
              rightButtonBackgroundColor="#16a085"
              leftButtonBackgroundColor="#c0392b"
            />
            <Text style={styles.subTitle}>Período Ativo</Text>
            <View style={styles.activeGroup}>
              <Text style={styles.activeText}>De:</Text>
              <InputTime
                onChange={(val) => {
                  this.setState({startTime: val});
                  console.log('valor nos ajustes', val);
                }}
                defaultTime={startTime}
              />
              <View style={styles.divisor} />
              <Text style={styles.activeText}>Até:</Text>
              <InputTime
                onChange={(val) => {
                  this.setState({finalTime: val});
                  console.log('valor nos ajustes', val);
                }}
                defaultTime={finalTime}
              />
            </View>

            <TouchableOpacity
              onPress={() => this.onSaveInfo()}
              style={styles.button}>
              <Text style={styles.textButton}>Salvar</Text>
            </TouchableOpacity>
            <BannerAd
              unitId={adUnitId}
              size={BannerAdSize.ADAPTIVE_BANNER}
              requestOptions={{
                requestNonPersonalizedAdsOnly: true,
              }}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  safeViewContainer: {
    flex: 1,
  },
  scroll: {
    flex: 1,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 20,
  },
  subTitle: {
    fontSize: 18,
    marginHorizontal: 20,
    marginTop: 20,
    // marginBottom: 5,
    textAlign: 'justify',
  },
  activeGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  activeText: {
    marginHorizontal: 7,
  },
  divisor: {
    marginHorizontal: 15,
  },
  button: {
    marginVertical: 20,
    backgroundColor: '#3498DB',
    borderRadius: 10,
    height: 50,
    width: 130,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textButton: {
    fontSize: 16,
    color: '#FFF',
  },
});
