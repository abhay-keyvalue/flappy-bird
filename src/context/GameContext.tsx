import React, { createContext, useContext, useState } from 'react';
import { BIRD_SIZE } from '../constants';
import { DifficultyLevel } from '../types/game';

interface Position {
  x: number;
  y: number;
}

interface Bird {
  position: Position;
  velocity: number;
  rotation: number;
}

interface GameContextType {
  bird: Bird;
  setBird: React.Dispatch<React.SetStateAction<Bird>>;
  isGameOver: boolean;
  setIsGameOver: React.Dispatch<React.SetStateAction<boolean>>;
  score: number;
  setScore: React.Dispatch<React.SetStateAction<number>>;
  difficulty: DifficultyLevel;
  setDifficulty: React.Dispatch<React.SetStateAction<DifficultyLevel>>;
  isMuted: boolean;
  setIsMuted: React.Dispatch<React.SetStateAction<boolean>>;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [bird, setBird] = useState<Bird>({
    position: { x: BIRD_SIZE * 2, y: 300 },
    velocity: 0,
    rotation: 0,
  });
  const [isGameOver, setIsGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [difficulty, setDifficulty] = useState<DifficultyLevel>('BEGINNER');
  const [isMuted, setIsMuted] = useState(false);

  return (
    <GameContext.Provider
      value={{
        bird,
        setBird,
        isGameOver,
        setIsGameOver,
        score,
        setScore,
        difficulty,
        setDifficulty,
        isMuted,
        setIsMuted,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGameContext = () => {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error('useGameContext must be used within a GameProvider');
  }
  return context;
}; 