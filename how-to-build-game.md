# Flappy Bird Game in React Native Expo

This documentation provides a step-by-step guide to developing a **Flappy Bird**-style game using **React Native Expo**, with the help of the following libraries:

- `react-native-game-engine` (for game loop and physics handling)
- `@shopify/react-native-skia` (for rendering graphics)
- `react-native-reanimated` (for smooth animations)

## Prerequisites

Ensure you have the following installed:

- Node.js (latest LTS recommended)
- Expo CLI (`npm install -g expo-cli`)
- A React Native development environment (either iOS Simulator or Android Emulator)

## 1. Initialize the Project

```sh
expo init FlappyBirdGame --template blank
cd FlappyBirdGame
```

## 2. Install Dependencies

```sh
npm install react-native-game-engine @shopify/react-native-skia react-native-reanimated
```

## 3. Project Structure

```
FlappyBirdGame/
│-- App.tsx
│── logic/
│   │-- entities.js
│   │-- physics.js
└── components/
    ├── Bird.tsx
    ├── Pipe.tsx
    ├── Background.tsx
```

## 4. Implement the Game Logic

### 4.1 Create the Background Component
Create `components/background.tsx`:

```javascript
import React from "react";
import { Canvas, Rect } from "@shopify/react-native-skia";
import { View } from "react-native";

const Background: React.FC = () => {
  return (
    <View style={{ position: "absolute", width: "100%", height: "100%" }}>
      <Canvas style={{ flex: 1 }}>
        <Rect x={0} y={0} width={400} height={800} color="skyblue" />
      </Canvas>
    </View>
  );
};

export default Background;
```

### 4.2 Create the Bird Component
Create `components/bird.txs`:

```javascript
import React from "react";
import { Canvas, Circle } from "@shopify/react-native-skia";
import { View } from "react-native";

type BirdProps = {
  position: { x: number; y: number };
};

const Bird: React.FC<BirdProps> = ({ position }) => {
  return (
    <View style={{ position: "absolute", left: position.x, top: position.y }}>
      <Canvas style={{ width: 50, height: 50 }}>
        <Circle cx={25} cy={25} r={20} color="yellow" />
      </Canvas>
    </View>
  );
};

export default Bird;
```

### 4.3 Create the Pipe Component
Create `components/pipe.tsx`:

```javascript
import React from "react";
import { Canvas, Rect } from "@shopify/react-native-skia";
import { View } from "react-native";

type PipeProps = {
  position: { x: number; y: number };
  height: number;
};

const Pipe: React.FC<PipeProps> = ({ position, height }) => {
  return (
    <View style={{ position: "absolute", left: position.x, top: position.y }}>
      <Canvas style={{ width: 50, height: height }}>
        <Rect x={0} y={0} width={50} height={height} color="green" />
      </Canvas>
    </View>
  );
};

export default Pipe;
```

### 4.4 Define Game Entities
Create `entities.js` to define the game entities, such as the bird and pipes.

```javascript
import Bird from "../components/bird";
import Pipe from "../components/pipe";
import Background from "../components/background";

export const createEntities = () => ({
  background: { renderer: <Background /> },
  bird: {
    position: { x: 50, y: 300 },
    velocity: { x: 0, y: 0 },
    renderer: <Bird />,
  },
  pipeTop: {
    position: { x: 300, y: 0 },
    height: 150,
    renderer: <Pipe />,
  },
  pipeBottom: {
    position: { x: 300, y: 400 },
    height: 200,
    renderer: <Pipe />,
  },
  score: { value: 0 },
});
```

### 4.5 Game Physics System
Create `physics.js` to handle score updates when the bird successfully passes a pipe.

```javascript
export const Physics = (entities, { touches, dispatch }) => {
  let bird = entities.bird;
  let score = entities.score;

  if (!bird) return entities;

  // Gravity Effect
  bird.velocity.y += 0.1;
  bird.position.y += bird.velocity.y;

  // Jump Handling
  touches
    .filter((t) => t.type === "press")
    .forEach(() => {
      bird.velocity.y = -4;
    });

  // Pipe movement
  entities.pipeTop.position.x -= 3;
  entities.pipeBottom.position.x -= 3;

  // Reset pipes when they move off screen
  if (entities.pipeTop.position.x < -50) {
    entities.pipeTop.position.x = 300;
    entities.pipeBottom.position.x = 300;
  }

  // Check if pipes passed
  if (entities.pipeTop.position.x + 50 < bird.position.x) {
    score.value += 1;
    entities.pipeTop.position.x = 300;
    entities.pipeBottom.position.x = 300;
  }

  // Check for collisions
  if (
    bird.position.y > 750 || // Ground collision
    (bird.position.x + 20 > entities.pipeTop.position.x &&
      bird.position.y < entities.pipeTop.height) || // Top pipe collision
    (bird.position.x + 20 > entities.pipeBottom.position.x &&
      bird.position.y + 20 > entities.pipeBottom.position.y) // Bottom pipe collision
  ) {
    dispatch({ type: "game-over" });
  }

  return entities;
};
```

### 4.6 Display Score in Game Screen
Update `App.tsx` to show the score.

```javascript
import React, { useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { GameEngine } from "react-native-game-engine";
import { createEntities } from "./logic/entities";
import { Physics } from "./logic/physics";
import Background from "components/background";

export default function App() {
  const [running, setRunning] = useState(true);
  const [entities, setEntities] = useState(createEntities());

  const restartGame = () => {
    setEntities(createEntities());
    setRunning(true);
  };

  if (!running) {
    return (
      <View style={{flex: 1}}>
      <Background />
  
      <TouchableOpacity onPress={restartGame} style={styles.overlay}>
        <Text style={styles.text}>Game Over! Tap to Restart</Text>
      </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.scoreText}>Score: {entities.score.value}</Text>
      <GameEngine
        systems={[Physics]}
        entities={entities}
        running={running}
        onEvent={(e: any) => {
          if (e.type === "game-over") {
            setRunning(false);
          }
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "skyblue",
  },
  overlay: {
    position: "absolute",
    top: 400,
    left: 50,
    right: 50,
    backgroundColor: "rgba(0,0,0,0.7)",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  text: {
    color: "white",
    fontSize: 20,
  },
  scoreText: {
    position: "absolute",
    top: 50,
    right: 20,
    zIndex: 10,
    fontSize: 20,
    fontWeight: "bold",
    color: "#FFF",
  },
});

```

Now simple flappy bird game created successfully! 🎮 🚀

