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