import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TouchableWithoutFeedback, Text, Dimensions } from 'react-native';
import { useGameContext } from '../context/GameContext';
import { Bird } from '../components/Bird';
import { GRAVITY, JUMP_FORCE } from '../constants';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

export const GameScreen: React.FC = () => {
  const { bird, setBird, isGameOver, setIsGameOver } = useGameContext();
  const [time, setTime] = useState(0);

  useEffect(() => {
    const gameLoop = setInterval(() => {
      if (!isGameOver) {
        setBird(prevBird => {
          const newY = prevBird.position.y + prevBird.velocity;
          
          // Check if bird hits the bottom of the screen
          if (newY > SCREEN_HEIGHT - 40) {
            setIsGameOver(true);
            return prevBird;
          }

          return {
            ...prevBird,
            velocity: prevBird.velocity + GRAVITY,
            position: {
              ...prevBird.position,
              y: newY,
            },
            rotation: Math.min(90, (prevBird.velocity / GRAVITY) * 15),
          };
        });
      }
    }, 1000 / 60);

    return () => clearInterval(gameLoop);
  }, [isGameOver, setBird, setIsGameOver]);

  // Timer effect
  useEffect(() => {
    if (!isGameOver) {
      const timer = setInterval(() => {
        setTime(prev => prev + 1);
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [isGameOver]);

  const handleTap = () => {
    if (isGameOver) {
      // Reset game
      setBird(prevBird => ({
        ...prevBird,
        position: { x: prevBird.position.x, y: 300 },
        velocity: 0,
        rotation: 0,
      }));
      setIsGameOver(false);
      setTime(0);
    } else {
      setBird(prevBird => ({
        ...prevBird,
        velocity: JUMP_FORCE,
      }));
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <TouchableWithoutFeedback onPress={handleTap}>
      <View style={styles.container}>
        <View style={styles.timerContainer}>
          <Text style={styles.timerText}>{formatTime(time)}</Text>
        </View>
        <Bird />
        {isGameOver && (
          <View style={styles.gameOverContainer}>
            <Text style={styles.gameOverText}>You are failed!</Text>
            <Text style={styles.tapToRestartText}>Tap to restart</Text>
          </View>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#87CEEB',
  },
  timerContainer: {
    position: 'absolute',
    top: 40,
    right: 20,
    zIndex: 1,
    padding: 10,
    borderRadius: 10,
  },
  timerText: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: 'bold',
  },
  gameOverContainer: {
    position: 'absolute',
    top: '50%',
    left: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
  },
  gameOverText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
    marginBottom: 20,
  },
  tapToRestartText: {
    fontSize: 20,
    color: '#FFFFFF',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
}); 