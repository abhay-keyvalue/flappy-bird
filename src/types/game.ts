export type DifficultyLevel = 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED' | 'EXPERT';

export interface GameState {
  difficulty: DifficultyLevel;
  score: {
    current: number;
    high: number;
  };
  bird: {
    position: {
      x: number;
      y: number;
    };
    velocity: {
      x: number;
      y: number;
    };
    rotation: number;
  };
  pipes: Array<{
    id: string;
    position: {
      x: number;
      y: number;
    };
    passed: boolean;
  }>;
} 