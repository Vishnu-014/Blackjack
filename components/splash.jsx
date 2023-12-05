import { StyleSheet, Text, View } from 'react-native';
import React, { useRef } from 'react';
import LottieView from 'lottie-react-native';

const AnimatedSplashScreen = ({ onAnimationFinish }) => {
  const animation = useRef(null);

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'black',
      }}
    >
      <LottieView
        autoPlay
        onAnimationFinish={onAnimationFinish}
        loop={false}
        ref={animation}
        style={{
          width: '80%',
          maxWidth: 400,
        }}
        source={require('../assets/blackjack.json')}
      />
    </View>
  );
};

export default AnimatedSplashScreen;

const styles = StyleSheet.create({});
