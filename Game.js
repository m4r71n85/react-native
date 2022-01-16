import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, SafeAreaView, Pressable, Image } from 'react-native';

export default function Game() {
  const [activePlayer, setActivePlayer] = useState('X');
  const [gameOutcome, setGameOutcome] = useState('play');
  const [winnerSquares, setWinnerSquares] = useState([]);
  const [markers, setMarkers] = useState([
    null, null, null,
    null, null, null,
    null, null, null
  ]);
  const [stepNumber, setStepNumber] = useState(0);
  const colRow = {
      0: '1, 1',
      1: '2, 1',
      2: '3, 1',
      3: '1, 2',
      4: '2, 2',
      5: '3, 2',
      6: '1, 3',
      7: '2, 3',
      8: '3, 3',
  };
  const [currentMove, setCurrentMove] = useState(null);

  const markPosition = (position) => {
    if (calculateWinner(markers) || markers[position]) {
        return;
    }
    if (!markers[position]) {
      let temp = [...markers];
      temp[position] = activePlayer;
      setMarkers(temp);
      activePlayer === 'X' ? setActivePlayer('O') : setActivePlayer('X');
      setCurrentMove(null);
    }
  }

  const resetMarkers = (buttonName) => {
    setMarkers([
      null, null, null,
      null, null, null,
      null, null, null
    ]);
    setActivePlayer('X');
    setWinnerSquares([]);

    setStepNumber(0);
    buttonName === 'resetGame' ? setCurrentMove(null) : setCurrentMove(-1);
  }

  const calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];

    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        setWinnerSquares(lines[i]);
        return squares[a];
      }
    }
    let allFull = squares.every(function(e) {
      return e !== null;
    });
    if (allFull) {
        return 'T';
    }
    return null;
  }

  useEffect(() => {
    const winner = calculateWinner(markers);
    if (winner === 'X' || winner === 'O') {
      setGameOutcome('won');
    } else if (winner === 'T') {
      setGameOutcome('draw');
    } else if (winner === null) {
      setGameOutcome('play');
    }
  }, [markers])

  let squares = [];
  for (let i = 0; i < 9; i++) {
    squares[i] = 
      <Pressable key={'cell-' + i} onPress={() => markPosition(i)} style={[styles.cell, {backgroundColor: gameOutcome === 'draw' ? 'lightyellow' : winnerSquares.includes(i) ? 'lightgreen' : 'white'}]}>
        {markers[i] === 'X' && <Image source={require('./assets/img/cross.png')} style={styles.icon}></Image>}
        {markers[i] === 'O' && <Image source={require('./assets/img/zero.png')} style={styles.icon}></Image>}
      </Pressable>
    ;
  }
  
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.body}>
        <View style={styles.boardContainer}>
          {squares}
        </View>
        <Pressable style={styles.button} onPress={() => resetMarkers('resetGame')}><Text style={styles.buttonTitle}>Нова игра</Text></Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 300
  },

  body: {
    width: 312,
    maxHeight: 400,
    marginTop: -300,
    alignItems: 'center'
  },

  boardContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    alignItems: 'center'
  },

  cell: {
    width: 100,
    height: 100,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#999999',
    backgroundColor: 'white'
  },

  icon: {
    width: 70,
    height: 70
  },

  button: {
      padding: 10,
      marginTop: 60,
      backgroundColor: 'grey',
      color: 'white',
      justifyContent: 'center',
      alignItems: 'center',
      width: 120
  },

  buttonTitle: {
      color: 'white',
      MozUserSelect: "none",
      WebkitUserSelect: "none",
      msUserSelect: "none"
    }
});
