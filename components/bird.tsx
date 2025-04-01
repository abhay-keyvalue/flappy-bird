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