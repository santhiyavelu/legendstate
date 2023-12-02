import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { COLORS } from '../../assets/constants';
import { README } from '../../assets/instructions';
import useColor from '../../hooks/useColor';
import useCountDown from '../../hooks/useCountDown';
import useTimer from '../../hooks/useTimer';
import { ButtonVariant } from '../../types/button.enum';
import Button from '../Buttons/Button';

const RedLightGame = () => {
  const {time, reset, pause, startTimer} = useTimer();
  const {timeLeft, resetCount, pauseCountDown, startCountDown} = useCountDown();
  const {color, startColor, stopColor} = useColor();
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [gameStart, setGameStart] = useState(false);
  const [victory, setVictory] = useState(false);

  const handleScore = () => {
    if (color === ButtonVariant.SUCCESS) {
      setScore(time);
      setGameOver(true);
      setGameStart(false);
      setVictory(true);
    } else {
      setGameOver(true);
      setVictory(false);
    }
  };

  const handlePlay = () => {
    setVictory(false);
    reset();
    resetCount();
    setScore(0);
    setGameStart(true);
    setGameOver(false);
    startColor();
    color === ButtonVariant.SUCCESS && startTimer();
    startCountDown();
  };

  useEffect(() => {
    color === ButtonVariant.SUCCESS && startTimer();
  }, [color, startTimer]);

  useEffect(() => {
    if (gameOver) {
      pause();
      pauseCountDown();
      stopColor();
    }
  }, [gameOver, pause, pauseCountDown, stopColor]);
  return (
    <View style={styles.container}>
      <View style={styles.sectionContainer}>
        <View>
          <Text style={styles.header}>Red Light Green Light Game</Text>
        </View>
        <View>
          <Text>{README.RED_LIGHT_GREEN_LIGHT_INSTRUCTION}</Text>
        </View>
        <Button onPress={handlePlay}>
          <Text style={styles.buttonLabel}>Start Game</Text>
        </Button>
      </View>
      <View
        style={[
          styles.sectionContainer,
          {flexDirection: 'row', justifyContent: 'space-between'},
        ]}>
        <Text>Score: {score} ms</Text>
        {victory && <Text>Victory</Text>}
        {gameOver && !victory && <Text>Game Over</Text>}
        <Text>{timeLeft} ms</Text>
      </View>
      {gameStart && !gameOver && (
        <View style={[styles.sectionContainer]}>
          <Button onPress={handleScore} variant={color} style={{padding: 0}}>
            <View style={[styles.box]}>
              <Text style={styles.text}>
                {color === ButtonVariant.SUCCESS
                  ? 'Click now!'
                  : 'Do not click!'}
              </Text>
            </View>
          </Button>
        </View>
      )}

      {gameOver && !gameStart && (
        <View>
          <Text>{}</Text>
        </View>
      )}
    </View>
  );
};

export default RedLightGame;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
  },
  sectionContainer: {
    marginTop: 32,
    gap: 16,
  },
  header: {
    fontWeight: 'bold',
  },
  buttonLabel: {color: COLORS.LIGHT, fontWeight: 'bold'},
  box: {
    width: '100%',
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: 'white',
    fontSize: 24,
  },
});
