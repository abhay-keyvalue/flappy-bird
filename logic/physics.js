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
