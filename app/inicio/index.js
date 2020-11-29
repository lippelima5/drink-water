import React, {Component} from 'react';
import {Text, StyleSheet, View, TouchableOpacity} from 'react-native';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';

export default class inicio extends Component {
  render() {
    return (
      <SafeAreaView style={styles.safeViewContainer}>
        <View style={styles.container}>
          <Text style={styles.titulo}> Beba Água </Text>
          <Text style={styles.texto}>
            Configure abaixo a frequência que você deseja ser lembrado a beber
            agua e nós iremos te ajudar a lembrar.
          </Text>
          <TouchableOpacity
            activeOpacity={0.5}
            style={styles.button}
            onPress={() => this.props.navigation.navigate('Ajustes')}>
            <Text style={styles.textButton}>Configurar</Text>
          </TouchableOpacity>
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
});
