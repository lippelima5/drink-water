import React, {Component} from 'react';
import {Text, StyleSheet, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

export default class Teste extends Component {
  render() {
    return (
      <View>
        <Text> Teste </Text>
        <Icon name="play" color={'#000'} size={35} />
      </View>
    );
  }
}

const styles = StyleSheet.create({});
