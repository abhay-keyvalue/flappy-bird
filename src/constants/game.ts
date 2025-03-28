import { Dimensions } from 'react-native';

const { width: WINDOW_WIDTH, height: WINDOW_HEIGHT } = Dimensions.get('window');

export const GAME_CONSTANTS = {
  WINDOW_WIDTH,
  WINDOW_HEIGHT,
  GRAVITY: 0.8,
  FLAP_FORCE: -8,
  PIPE_SPEED: 2,
  PIPE_SPAWN_INTERVAL: 1500,
  PIPE_WIDTH: 60,
  PIPE_GAP: 150,
  BIRD_SIZE: 40,
  GROUND_HEIGHT: 100,
  SKY_HEIGHT: WINDOW_HEIGHT - 100,
} as const;

export const GAME_STATES = {
  READY: 'READY',
  PLAYING: 'PLAYING',
  GAME_OVER: 'GAME_OVER',
} as const;

export const DIFFICULTY_LEVELS = {
  BEGINNER: {
    PIPE_GAP: 180,
    PIPE_SPEED: 1.5,
    GRAVITY: 0.6,
  },
  INTERMEDIATE: {
    PIPE_GAP: 160,
    PIPE_SPEED: 2,
    GRAVITY: 0.7,
  },
  ADVANCED: {
    PIPE_GAP: 140,
    PIPE_SPEED: 2.5,
    GRAVITY: 0.8,
  },
  EXPERT: {
    PIPE_GAP: 120,
    PIPE_SPEED: 3,
    GRAVITY: 0.9,
  },
} as const;

export type GameState = typeof GAME_STATES[keyof typeof GAME_STATES];
export type DifficultyLevel = keyof typeof DIFFICULTY_LEVELS; 