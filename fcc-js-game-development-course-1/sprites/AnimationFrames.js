export default (stateFrames, spriteWidth, spriteHeight) =>
  Object.entries(stateFrames).reduce((acc, [state, frameCount], stateIndex) => {
    acc[state] = Array.from({ length: frameCount }).map((_, frameIndex) => ({
      x: frameIndex * spriteWidth,
      y: stateIndex * spriteHeight,
    }));
    return acc;
  }, {});
