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
