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