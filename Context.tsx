import React, { createContext, useContext, useState, useEffect } from 'react';
import { Audio } from 'expo-av';
import 'react-native-console-time-polyfill';

const UrlContext = createContext();
const UrlUpdateContext = createContext();
const SoundContext = createContext();
const LoadingAudioContext = createContext();
const AudioPlayingContext = createContext();
const HandlePauseContext = createContext();
const HandlePlayContext = createContext();

export const useUrl = () => {
  return useContext(UrlContext);
};

export const useUrlUpdate = () => {
  return useContext(UrlUpdateContext);
};

export const useSoundContext = () => {
  return useContext(SoundContext);
};

export const useLoadingContext: Function = () => {
  return useContext(LoadingAudioContext);
};

export const useAudioPlayingContext: Function = () => {
  return useContext(AudioPlayingContext);
};
export const useHandlePauseContext: Function = () => {
  return useContext(HandlePauseContext);
};
export const useHandlePlayContext: Function = () => {
  return useContext(HandlePlayContext);
};

let sound: any;
const initiateAudio = async () => {
  await Audio.setAudioModeAsync({ staysActiveInBackground: true });
  sound = new Audio.Sound();
};
initiateAudio();

export const UrlProvider = ({ children }: any) => {
  const [station, setStation] = useState();
  const [loadingAudio, setLoadingAudio] = useState(false);
  const [audioPlaying, setAudioPlaying] = useState(false);

  useEffect(() => {
    const startSound = async () => {
      const status = await sound.getStatusAsync();

      const playSound = async () => {
        try {
          setLoadingAudio(true);
          sound.setOnPlaybackStatusUpdate(null);
          await Audio.setAudioModeAsync({
            staysActiveInBackground: true,
          });
          const res = await sound.loadAsync(
            { uri: station.url_resolved },
            {},
            false,
          );
          const play = await sound.playAsync();
          // console.log(play, 'RES');
          setLoadingAudio(false);
          setAudioPlaying(true);
        } catch (e) {
          console.log('cannot play the sound file', e);
        }
      };

      if (status.isLoaded && station) {
        await sound.unloadAsync();
        await playSound();
      } else if (station) {
        await playSound();
      }
    };
    startSound();
  }, [station]);

  const handleStationChange = (station: object) => {
    setStation(station);
  };

  const handlePauseSound = async () => {
    const pauseRes = await sound.pauseAsync();
    if (!pauseRes.isPlaying) {
      setAudioPlaying(false);
    }
  };

  const handlePlaySound = async () => {
    const playRes = await sound.playAsync();
    if (playRes.isPlaying) {
      setAudioPlaying(true);
    }
  };

  return (
    <UrlContext.Provider value={station}>
      <UrlUpdateContext.Provider value={handleStationChange}>
        <SoundContext.Provider value={sound}>
          <LoadingAudioContext.Provider value={loadingAudio}>
            <AudioPlayingContext.Provider value={audioPlaying}>
              <HandlePauseContext.Provider value={handlePauseSound}>
                <HandlePlayContext.Provider value={handlePlaySound}>
                  {children}
                </HandlePlayContext.Provider>
              </HandlePauseContext.Provider>
            </AudioPlayingContext.Provider>
          </LoadingAudioContext.Provider>
        </SoundContext.Provider>
      </UrlUpdateContext.Provider>
    </UrlContext.Provider>
  );
};
