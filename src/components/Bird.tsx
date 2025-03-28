import React from 'react';
import { StyleSheet } from 'react-native';
import Animated, { useAnimatedStyle } from 'react-native-reanimated';
import { Canvas, Circle, Path, Group } from '@shopify/react-native-skia';
import { useGameContext } from '../context/GameContext';
import { BIRD_SIZE } from '../constants';

export const Bird: React.FC = () => {
  const { bird } = useGameContext();

  const animatedStyle = useAnimatedStyle(() => {
    return {
      position: 'absolute',
      left: bird.position.x - BIRD_SIZE / 2,
      top: bird.position.y - BIRD_SIZE / 2,
      width: BIRD_SIZE,
      height: BIRD_SIZE,
      transform: [{ rotate: `${bird.rotation}deg` }],
    };
  });

  return (
    <Animated.View style={[styles.container, animatedStyle]}>
      <Canvas style={styles.canvas}>
        <Group>
          {/* Bird body */}
          <Circle
            cx={BIRD_SIZE / 2}
            cy={BIRD_SIZE / 2}
            r={BIRD_SIZE / 2}
            color="#FFD700"
          />
          {/* Bird eye */}
          <Circle
            cx={BIRD_SIZE * 0.7}
            cy={BIRD_SIZE * 0.4}
            r={BIRD_SIZE * 0.1}
            color="#000"
          />
          {/* Bird beak */}
          <Path
            path={`M ${BIRD_SIZE * 0.8} ${BIRD_SIZE * 0.5} L ${BIRD_SIZE * 1.1} ${BIRD_SIZE * 0.5} L ${BIRD_SIZE * 0.8} ${BIRD_SIZE * 0.6} Z`}
            color="#FFA500"
          />
        </Group>
      </Canvas>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: BIRD_SIZE,
    height: BIRD_SIZE,
  },
  canvas: {
    width: BIRD_SIZE,
    height: BIRD_SIZE,
  },
}); 