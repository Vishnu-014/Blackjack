import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, Alert, Modal, Pressable, TextInput } from 'react-native'
import Blackjack from './Blackjack';
import { Button } from 'react-native-elements';
import { AntDesign } from '@expo/vector-icons';


const BlackjackScreen = () => {

  const cards = ['a', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'k', 'q', 'j'];
  const [userCards, setUserCards] = useState([]);
  const [computerCards, setComputerCards] = useState([]);
  const [userScore, setUserScore] = useState([]);
  const [computerScore, setComputerScore] = useState([]);
  const [computerScoreView, setComputerScoreView] = useState(false)
  const [modalVisible, setModalVisible] = useState(false);
  const [userAmount, setUserAmount] = useState(2500);
  const [userBetAmount, setBetUserAmount] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const storeData = async (key, value) => {
    try {
      await AsyncStorage.setItem(key, value);
      console.log('Data stored successfully!');
    } catch (error) {
      console.log('Error storing data: ', error);
    }
  };

  const getData = async (key) => {
    try {
      const value = await AsyncStorage.getItem(key);
      if (value !== null) {
        console.log('Retrieved data:', value);
        // Do something with the data
        setUsr(value)
      }
    } catch (error) {
      console.log('Error retrieving data: ', error);
    }
  };

  function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

  function calculateScore(score) {
    // console.log('====================================');
    // console.log(score);
    // console.log('====================================');
    let sum = 0;
    const res = score.map((item) => {
      if (item === 'k') {
        sum += 10
      } else if (item === 'q') {
        sum += 10
      } else if (item === 'j') {
        sum += 10
      } else if (item === 'a') {
        if (sum >= 21) {
          sum = sum + 1
        } else {
          sum = sum + 11
        }
      } else {
        sum = sum + Number(item)
      }
    })
    // console.log('====================================');
    // console.log(sum);
    // console.log('====================================');
    return sum;
  }

  function checkWinner(compScore) {
    // console.log('====================================');
    // console.log(userScore, compScore);
    // console.log('====================================');
    let user_amount = Number(userAmount) + Number(userBetAmount)
    let user_minus_amount = Number(userAmount) - Number(userBetAmount)
    console.log(user_amount);
    while (isPlaying) {
      if (userScore === 21) {
        setUserAmount(user_amount)
        return Alert.alert('Black Jack', 'User Wins 🏆')
      }
      if (compScore === 21) {
        setUserAmount(user_minus_amount)
        return Alert.alert('Black Jack', 'Computer Wins 🤖')
      }
      if (userScore > 21) {
        setUserAmount(user_minus_amount)
        return Alert.alert('Game Over', 'Computer Wins 🤖')
      }
      if (compScore > 21) {
        setUserAmount(user_amount)
        return Alert.alert('Game Over', 'User Wins 🏆')
      }
      if (compScore < userScore) {
        setUserAmount(user_amount)
        return Alert.alert('Game Over', 'User Wins 🏆')
      }
      if (compScore > userScore) {
        setUserAmount(user_minus_amount)
        return Alert.alert('Game Over', 'Computer Wins 🤖')
      }
      if (userScore === compScore) {
        return Alert.alert('Game Over', 'Draw 🤝')
      }
    }
  }

  // useEffect(() => {
  //   computerCardsAdd()
  // }, [computerScore, computerCards])

  // const computerCardsAdd = () => {
  //   let compute_card = []
  //   while (computerScore < 17) {
  //     let randomIntC = getRandomInt(cards.length)
  //     const newCardComputer = cards[randomIntC]
  //     compute_card.push(newCardComputer)

  //     setComputerCards(compute_card)
  //     setComputerScore(calculateScore(compute_card))
  //   }
  //   if (computerScore > 21) {
  //     return Alert.alert('Black Jack', 'User wins')
  //   }
  // }

  const startHandler = () => {

    if (!isPlaying) {
      setIsPlaying(true)
      setComputerScoreView(false)
      let user_card = []
      let compute_card = []
      for (let i = 0; i <= 1; i++) {

        // USER SELECTION
        let randomInt = getRandomInt(cards.length)
        const newCard = cards[randomInt]
        user_card.push(newCard)


        //COMPUTER SELECTION
        let randomIntC = getRandomInt(cards.length)
        const newCardComputer = cards[randomIntC]
        compute_card.push(newCardComputer)
      }
      setUserCards(user_card)
      setComputerCards(compute_card)


      setUserScore(calculateScore(user_card))
      setComputerScore(calculateScore(compute_card))
    }
  }

  const dealHandler = () => {
    if (isPlaying) {
      let user_card = userCards
      let randomInt = getRandomInt(cards.length)
      const newCard = cards[randomInt]
      user_card.push(newCard)

      setUserCards(user_card)
      setUserScore(calculateScore(user_card))
    }

  }

  const standHandler = () => {
    if (isPlaying) {
      let compScore = computerScore
      while (compScore < 17) {
        compScore = computerScore
        let computer_card = computerCards
        let randomIntComp = getRandomInt(cards.length)
        const newCard = cards[randomIntComp]
        computer_card.push(newCard)

        setComputerCards(computer_card)
        compScore = calculateScore(computer_card)
        setComputerScore(compScore)
      }
      setComputerScore(compScore)

      setComputerScoreView(true)
      checkWinner(compScore)

      setIsPlaying(false)
    }
    //startHandler()
  }
  // console.log(userCards);
  // console.log(computerCards);

  // useEffect(() => {
  //   console.log(userScore + 'USer');
  // }, [userScore])

  const betHandler = () => {
    //console.log(userBetAmount);
    setModalVisible(false)
  }

  return (
    <View style={styles.container}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <AntDesign name="closecircleo" size={24} color="#fff" style={styles.closeIcon}
              onPress={() => setModalVisible(!modalVisible)}
            />

            <Text style={styles.modalText}>Balance: ${userAmount}</Text>
            <View style={{ flexDirection: 'row' }}>
              <Text style={styles.modalText}>Place Bet: </Text>
              <TextInput style={styles.inputTxt} placeholder='Bet Amount'
                onChangeText={setBetUserAmount} keyboardType='number-pad'
                autoFocus
              />
            </View>

            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={betHandler}
            >
              <Text style={styles.textStyle}>Bet Amount</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      <View style={{ marginTop: 40, marginRight: 300, flexDirection: 'row', }}>
        <Button
          title="New Game"
          icon={{
            name: 'arrow-right',
            type: 'font-awesome',
            size: 15,
            color: 'white',
          }}
          iconRight
          iconContainerStyle={{ marginRight: 0 }}
          titleStyle={{ fontWeight: '700' }}
          buttonStyle={{
            backgroundColor: 'rgba(90, 154, 230, 1)',
            borderColor: 'transparent',
            borderWidth: 0,
            borderRadius: 30,
          }}
          containerStyle={{
            width: 150,
            marginHorizontal: 10,
            marginVertical: 10,
            padding: 5
          }}
          onPress={() => startHandler()}
        />
        {!isPlaying && <Button
          title={`Bet Amount: $${userBetAmount}`}
          icon={{
            name: '',
            type: 'font-awesome',
            size: 15,
            color: 'white',
          }}
          iconRight
          iconContainerStyle={{ marginRight: 0 }}
          titleStyle={{ fontWeight: '700' }}
          buttonStyle={{
            backgroundColor: 'rgba(90, 154, 230, 1)',
            borderColor: 'transparent',
            borderWidth: 0,
            borderRadius: 30,
          }}
          containerStyle={{
            width: 150,
            marginHorizontal: 10,
            marginVertical: 10,
            padding: 5,
            marginLeft: 70
          }}
          onPress={() => setModalVisible(true)}
        />}
      </View>

      <View style={{ flex: 1, }}>
        <View style={{ backgroundColor: '#617A55', borderRadius: 10, height: 35 }}>
          <Text style={[styles.scoreText, { padding: 5, fontFamily: 'ExpoBold', fontSize: 30 }]}>
            Balance ${userAmount}</Text>
        </View>
        <View style={{ borderWidth: StyleSheet.hairlineWidth, borderColor: '#fff' }} />
        <View style={styles.scoreBoard}>
          <Text style={styles.scoreText}>Computer Score: {computerScoreView && computerScore}</Text>
        </View>
        <Blackjack cards={computerCards} computer={!computerScoreView} />
      </View>

      <View style={{ borderWidth: StyleSheet.hairlineWidth, borderColor: '#fff' }} />
      <View style={{ flex: 1.2, }}>
        <View style={styles.scoreBoard}>
          <Text style={styles.scoreText}>User Score: {userScore}</Text>
        </View>

        <Blackjack cards={userCards} />

        <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', marginBottom: 50 }}>
          {/* <Button title='Deal' onPress={() => dealHandler()} />
          <Button title='Stand' /> */}
          <Button
            title="DEAL"
            icon={{
              name: '',
              type: 'font-awesome',
              size: 15,
              color: 'white',
            }}
            iconRight
            iconContainerStyle={{ marginLeft: 0 }}
            titleStyle={{ fontWeight: '700' }}
            buttonStyle={{
              backgroundColor: '#408E91',
              borderColor: 'transparent',
              borderWidth: 0,
              borderRadius: 30,
            }}
            containerStyle={{
              width: 100,
              marginHorizontal: 50,
              marginVertical: 10,
            }}
            onPress={() => dealHandler()}
          />
          <Button
            title="STAND"
            icon={{
              name: '',
              type: 'font-awesome',
              size: 15,
              color: 'white',
            }}
            iconRight
            iconContainerStyle={{ marginLeft: 0 }}
            titleStyle={{ fontWeight: '700' }}
            buttonStyle={{
              backgroundColor: 'rgba(199, 43, 98, 1)',
              borderColor: 'transparent',
              borderWidth: 0,
              borderRadius: 30,
            }}
            containerStyle={{
              width: 100,
              marginHorizontal: 50,
              marginVertical: 10,
            }}
            onPress={() => standHandler()}
          />
        </View>
      </View>

    </View>
  )
}

export default BlackjackScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //backgroundColor: '#fff',
    marginHorizontal: 10,
  },
  scoreBoard: {
    margin: 10,
  },
  scoreText: {
    fontSize: 40,
    fontFamily: 'GameSpaceAcademy',
    color: '#fff'
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 0,
    backgroundColor: '#116D6E',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    color: '#fff',
    fontSize: 29,
    fontWeight: 'bold',
    fontFamily: 'Alien'
  },
  closeIcon: {
    marginLeft: 300,
    marginTop: -10,
    marginBottom: 10,
    //backgroundColor: '#fff'
  },
  inputTxt: {
    backgroundColor: '#fff',
    width: 150,
    height: 30,
    borderRadius: 15,
    padding: 5,
    marginLeft: 5,
    marginBottom: 20
  }
})