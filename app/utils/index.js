import React, {Component} from 'react';
import {ActivityIndicator, Image, Text, View} from 'react-native';

function getAppName() {
  return 'Beba Água';
}

function LoadingScreen() {
  return (
    <View>
      <ActivityIndicator />
      <Text>Carregando</Text>
    </View>
  );
}

function zeroLeft(n) {
  return n < 10 ? '0' + n.toString() : n.toString();
}

function getAppVersion() {
  return 'v1.0';
}

export {getAppName, LoadingScreen, zeroLeft, getAppVersion};
