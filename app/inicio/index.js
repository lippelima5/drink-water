import React, {Component} from 'react';
import {Text, StyleSheet, View, TouchableOpacity} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import LottieView from 'lottie-react-native';
import {BannerAd, BannerAdSize, TestIds} from '@react-native-firebase/admob';

const adUnitId = __DEV__
  ? TestIds.BANNER
  : 'ca-app-pub-1108301984584372/7310145668';

export default class inicio extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
    };
  }

  componentDidMount() {
    // var _anim = '../src/' + this.getNameAnimation();
    // console.log(_anim);
    // this.setState({
    //   animationName: _anim,
    // });
  }

  GenerateAnimation = () => {
    var chose = (Math.random() * (3 - 1) + 1).toFixed(0);
    switch (chose) {
      case '1':
        return (
          <LottieView
            autoSize={false}
            style={styles.animationContainer}
            source={require('../src/001.json')}
            autoPlay
            loop
          />
        );
      case '2':
        return (
          <LottieView
            autoSize={false}
            style={styles.animationContainer}
            source={require('../src/002.json')}
            autoPlay
            loop
          />
        );
      case '3':
        return (
          <LottieView
            autoSize={false}
            style={styles.animationContainer}
            source={require('../src/003.json')}
            autoPlay
            loop
          />
        );

      default:
        return (
          <LottieView
            autoSize={false}
            style={styles.animationContainer}
            source={require('../src/002.json')}
            autoPlay
            loop
          />
        );
    }
  };

  render() {
    const {isLoading, animationName} = this.state;
    return (
      <SafeAreaView style={styles.safeViewContainer}>
        <View style={styles.container}>
          <Text style={styles.titulo}> Beba Água </Text>

          <Text style={styles.texto}>
            Configure abaixo a frequência que você deseja ser lembrado a beber
            agua e nós iremos te ajudar a lembrar.
          </Text>

          {this.GenerateAnimation()}

          <TouchableOpacity
            activeOpacity={0.5}
            style={styles.button}
            onPress={() => this.props.navigation.navigate('Ajustes')}>
            <Text style={styles.textButton}>Configurar</Text>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.5}
            style={styles.button}
            onPress={() => this.props.navigation.navigate('Sobre')}>
            <Text style={styles.textButton}>Sobre</Text>
          </TouchableOpacity>

          {/* <TouchableOpacity
            activeOpacity={0.5}
            style={styles.button}
            onPress={() => this.props.navigation.navigate('Doacao')}>
            <Text style={styles.textButton}>Apoiar / Remover Ads</Text>
          </TouchableOpacity> */}

          <View style={styles.adsBannerContainer}>
            {/* <BannerAd
              unitId={adUnitId}
              size={BannerAdSize.ADAPTIVE_BANNER}
              requestOptions={{
                requestNonPersonalizedAdsOnly: true,
              }}
            /> */}
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
  titulo: {
    marginTop: 10,
    marginBottom: 5,
    fontSize: 30,
    fontWeight: 'bold',
  },
  texto: {
    fontSize: 18,
    textAlign: 'justify',
  },
  animationContainer: {
    height: 200,
    marginVertical: 10,
  },
  button: {
    margin: 20,
    width: 200,
    height: 50,
    borderRadius: 15,
    backgroundColor: '#3498db',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textButton: {
    color: '#FFF',
    fontSize: 18,
  },
  adsBannerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
});
