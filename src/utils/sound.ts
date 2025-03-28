import { Audio } from 'expo-av';
import { useGame } from '../context/GameContext';

const SOUND_FILES = {
  flap: require('../../assets/sounds/flap.mp3'),
  collision: require('../../assets/sounds/collision.mp3'),
  score: require('../../assets/sounds/score.mp3'),
} as const;

export const loadSound = async (soundFile: keyof typeof SOUND_FILES) => {
  try {
    const { sound } = await Audio.Sound.createAsync(SOUND_FILES[soundFile]);
    return sound;
  } catch (error) {
    console.warn(`Error loading sound ${soundFile}:`, error);
    return null;
  }
};

export const playSound = async (sound: Audio.Sound | null) => {
  try {
    if (sound) {
      await sound.replayAsync();
    }
  } catch (error) {
    console.warn('Error playing sound:', error);
  }
};

export const useGameSounds = () => {
  const { state } = useGame();
  const { isMuted } = state;

  const playFlapSound = async (sound: Audio.Sound | null) => {
    if (!isMuted) {
      await playSound(sound);
    }
  };

  const playCollisionSound = async (sound: Audio.Sound | null) => {
    if (!isMuted) {
      await playSound(sound);
    }
  };

  const playScoreSound = async (sound: Audio.Sound | null) => {
    if (!isMuted) {
      await playSound(sound);
    }
  };

  return {
    playFlapSound,
    playCollisionSound,
    playScoreSound,
  };
}; 