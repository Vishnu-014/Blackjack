import { StatusBar } from 'expo-status-bar';
import { ImageBackground, StyleSheet, Text, View } from 'react-native';
import React, { Fragment, useEffect, useState, useCallback } from 'react'
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';
import * as SplashScreen from 'expo-splash-screen';
import Blackjack from './screens/Blackjack';
import BlackjackScreen from './screens/BlackjackScreen';


export default function App() {

  const [fontsLoaded] = useFonts({
    "GameSpaceAcademy": require('./assets/fonts/GameSpaceAcademy.otf'),
    "Gameplay": require('./assets/fonts/Gameplay.ttf'),
    "GameOver": require('./assets/fonts/game_over.ttf'),
    "Alien": require("./assets/fonts/Alien.ttf"),
    "SodaBerry": require('./assets/fonts/SodaBerry.ttf'),
    "ExpoBold": require('./assets/fonts/Expo-Bold.otf'),
    "Score": require('./assets/fonts/SCOREBOARD.ttf')
  });

  useEffect(() => {
    async function prepare() {
      await SplashScreen.preventAutoHideAsync();
    }
    prepare();
  }, [])

  if (!fontsLoaded) {
    return undefined;
  } else {
    SplashScreen.hideAsync();
  }

  return (
    <ImageBackground style={styles.container}>
      <StatusBar style='light' />
      <BlackjackScreen />
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#40513B',
    // alignItems: 'center',
    // justifyContent: 'center',
    //marginHorizontal: 5,
  },
});
