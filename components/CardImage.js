import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'

const CardImage = ({ diceValue }) => {
  let diceNumber = diceValue;
  if (diceNumber === 'a') {
    return <Image style={styles.image} source={require('../assets/cards/a.png')} />
  }
  if (diceNumber === '2') {
    return <Image style={styles.image} source={require('../assets/cards/2.png')} />
  }
  if (diceNumber === '3') {
    return <Image style={styles.image} source={require('../assets/cards/3.png')} />
  }
  if (diceNumber === '4') {
    return <Image style={styles.image} source={require('../assets/cards/4.png')} />
  }
  if (diceNumber === '5') {
    return <Image style={styles.image} source={require('../assets/cards/5.png')} />
  }
  if (diceNumber === '6') {
    return <Image style={styles.image} source={require('../assets/cards/6.png')} />
  }
  if (diceNumber === '7') {
    return <Image style={styles.image} source={require('../assets/cards/7.png')} />
  }
  if (diceNumber === '8') {
    return <Image style={styles.image} source={require('../assets/cards/8.png')} />
  }
  if (diceNumber === '9') {
    return <Image style={styles.image} source={require('../assets/cards/9.png')} />
  }
  if (diceNumber === '10') {
    return <Image style={styles.image} source={require('../assets/cards/10.png')} />
  }
  if (diceNumber === 'k') {
    return <Image style={styles.image} source={require('../assets/cards/k.png')} />
  }
  if (diceNumber === 'q') {
    return <Image style={styles.image} source={require('../assets/cards/q.png')} />
  }
  if (diceNumber === 'j') {
    return <Image style={styles.image} source={require('../assets/cards/j.png')} />
  }
}

export default CardImage

const styles = StyleSheet.create({
  image: {
    position: 'relative',
    width: 140,
    height: 200,
    resizeMode: "contain",
    //backgroundColor: 'red',
    //marginLeft: 120,
    marginLeft: 0,
    zIndex: 10,
  },
})