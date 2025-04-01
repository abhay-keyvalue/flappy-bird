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