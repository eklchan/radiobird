import React, { createContext, useContext, useState, useEffect } from 'react';
import { Audio } from 'expo-av';
import 'react-native-console-time-polyfill';
import { addToRecents } from './utils/localStorageRecents';
import { Station } from './interfaces';
import NetInfo from '@react-native-community/netinfo';

const UrlContext = createContext<Station | undefined>(undefined);
const UrlUpdateContext = createContext<Function | undefined>(undefined);
const LoadingAudioContext = createContext<boolean | undefined>(undefined);
const AudioPlayingContext = createContext<boolean | undefined>(undefined);
const HandlePauseContext = createContext<Function | undefined>(undefined);
const HandlePlayContext = createContext<Function | undefined>(undefined);
const SleepTimeContext = createContext<number | undefined>(undefined);
const SetSleepTimeContext = createContext<Function | undefined>(undefined);

export const useUrl = () => {
  return useContext(UrlContext);
};

export const useUrlUpdate: Function = () => {
  return useContext(UrlUpdateContext);
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

export const useSleepTimeContext: Function = () => {
  return useContext(SleepTimeContext);
};

export const useSetSleepTimeContext: Function = () => {
  return useContext(SetSleepTimeContext);
};

let sound: any;
const initiateAudio = async () => {
  await Audio.setAudioModeAsync({ staysActiveInBackground: true });
  sound = new Audio.Sound();
  console.log('AUDIO INITIATED');
};
initiateAudio();

export const UrlProvider = ({ children }: any) => {
  const [station, setStation] = useState<Station | undefined>(undefined);
  const [loadingAudio, setLoadingAudio] = useState(false);
  const [audioPlaying, setAudioPlaying] = useState(false);
  const [sleepTime, setSleepTime] = useState(-1);

  useEffect(() => {
    if (sleepTime > 0) {
      const timer = setTimeout(() => {
        setSleepTime(sleepTime - 1);
      }, 1000);

      return () => clearTimeout(timer);
    }
    if (sleepTime === 0) {
      console.log('DONE');
      sound.stopAsync();
      setAudioPlaying(false);
      setSleepTime(-1);
    }
  }, [sleepTime]);

  useEffect(() => {
    const startSound = async () => {
      const status = await sound.getStatusAsync();
      const connectionState = await NetInfo.fetch().then(
        (state) => state.isConnected,
      );

      const playSound = async () => {
        try {
          setLoadingAudio(true);
          sound.setOnPlaybackStatusUpdate(null);
          await Audio.setAudioModeAsync({
            staysActiveInBackground: true,
          });
          const res = await sound.loadAsync(
            { uri: `${station && station.url_resolved}` },
            {},
            false,
          );
          if (res.isLoaded) {
            const play = await sound.playAsync();
            setLoadingAudio(false);
            if (play.isPlaying) {
              setAudioPlaying(true);
              station && addToRecents(station);
            }
          } else {
            setLoadingAudio(false);
            console.log('UNABLE TO CONNECT');
          }
        } catch (e) {
          console.log('cannot play the sound file', e);
        }
      };

      if (status.isLoaded && station && connectionState) {
        await sound.unloadAsync();
        await playSound();
      } else if (station && connectionState) {
        await playSound();
      } else if (!connectionState) {
        console.log('No Internet');
      }
    };

    startSound();
  }, [station]);

  const handleStationChange = (newStation: Station) => {
    setStation(newStation);
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
        <LoadingAudioContext.Provider value={loadingAudio}>
          <AudioPlayingContext.Provider value={audioPlaying}>
            <HandlePauseContext.Provider value={handlePauseSound}>
              <HandlePlayContext.Provider value={handlePlaySound}>
                <SleepTimeContext.Provider value={sleepTime}>
                  <SetSleepTimeContext.Provider value={setSleepTime}>
                    {children}
                  </SetSleepTimeContext.Provider>
                </SleepTimeContext.Provider>
              </HandlePlayContext.Provider>
            </HandlePauseContext.Provider>
          </AudioPlayingContext.Provider>
        </LoadingAudioContext.Provider>
      </UrlUpdateContext.Provider>
    </UrlContext.Provider>
  );
};
