import React, { useEffect, useRef } from 'react';
import { View, Image, StyleSheet, FlatList, Text, Button } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
  runOnJS,
} from 'react-native-reanimated';
import CardImage from '../components/CardImage';

const Blackjack = ({ cards, computer }) => {

  //const [scrollPosition, setScrollPosition] = React.useState(0)
  const flatListRef = useRef(42);

  const translateY = useSharedValue(0);
  const rotate = useSharedValue(0);

  useEffect(() => {
    animateImage();
  }, []);

  const animateImage = () => {
    translateY.value = withTiming(10, {
      duration: 1000,
      easing: Easing.inOut,
    }, () => {
      // Reset translateY value after animation
      translateY.value = -60;
      // runOnJS(animateImage)(); // Call animateImage using runOnJS
    });

    rotate.value = withTiming(0, {
      duration: 1000,
      easing: Easing.in,
    });
  };

  const imageStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateY: translateY.value },
        { rotate: `${rotate.value}deg` },
      ],
    };
  });

  //console.log(cards);
  const handleScroll = (event) => {
    let yOffset = event.nativeEvent.contentOffset.x;
    console.log('====================================');
    console.log(yOffset);
    console.log('====================================');
  }
  const setCustomScrollValue = () => {
    const initialOffset = -42; // Your custom negative scroll value
    flatListRef.current.scrollToOffset({ offset: initialOffset, animated: false });
  };


  return (
    // <View style={{ flex: 1, marginTop: 50 }}>
    //   <View style={{ position: 'absolute', bottom: -210, left: 80 }}>
    //     <Animated.Image
    //       style={[{ width: 50, aspectRatio: 1 / 5, resizeMode: "contain" }]}
    //       source={require('../assets/joker.png')}
    //     />
    //   </View>
    //   <View style={{ position: 'absolute', bottom: -210, left: 120 }}>
    //     <Animated.Image
    //       style={[{ width: 50, aspectRatio: 1 / 5, resizeMode: "contain" }]}
    //       source={require('../assets/joker.png')}
    //     />
    //   </View>
    // </View>

    <View style={{ flex: 1, backgroundColor: '#40513B', flexDirection: 'row', flexWrap: 'wrap', marginTop: 30, marginBottom: 90 }}>
      {cards && computer && <FlatList
        data={cards}
        renderItem={({ item, index }) => index !== 1 && <CardImage diceValue={item} />}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
      />}
      {cards && !computer && <FlatList
        data={cards}
        renderItem={({ item, index }) => <CardImage diceValue={item} />}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        //style={{ backgroundColor: '#fff' }}
        //onScroll={(event) => handleScroll(event)}
        //ref={flatListRef}
        scrollEventThrottle={16}
      />}

    </View>


  )
}

export default Blackjack

const styles = StyleSheet.create({})