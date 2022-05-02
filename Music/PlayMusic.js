import { Audio } from "expo-av";

const sound = new Audio.Sound();

const playSound = async (music) => {
  try {
    await sound.unloadAsync();
    await sound.loadAsync(music);
    await sound.replayAsync();
    await sound.setIsLoopingAsync(true);
  } catch (error) {
    console.log(error);
  }
};

const stopSound = async (music) => {
  try {
    await sound.unloadAsync();
  } catch (error) {
    console.log("stop =" + error);
  }
};

export { playSound, stopSound };
