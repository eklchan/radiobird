import React, { createContext, useContext, useState, useEffect } from 'react';
import { Audio } from 'expo-av';

const UrlContext = createContext();
const UrlUpdateContext = createContext();

export const useUrl = () => {
  return useContext(UrlContext);
};

export const useUrlUpdate = () => {
  return useContext(UrlUpdateContext);
};

let sound: any;
const startSound = async () => {
  await Audio.setAudioModeAsync({ staysActiveInBackground: true });
  sound = new Audio.Sound();
};
startSound();

export const UrlProvider = ({ children }: any) => {
  const [station, setStation] = useState();
  console.log(station, 'Station');

  if (station) {
    const playSound = async () => {
      try {
        sound.setOnPlaybackStatusUpdate(null);
        await Audio.setAudioModeAsync({
          staysActiveInBackground: true,
        });
        const res = await sound.loadAsync(
          { uri: station.url_resolved },
          {},
          false,
        );
        await sound.playAsync();
        console.log(res, 'RES');
      } catch (e) {
        console.log('cannot play the sound file', e);
      }
    };
    playSound();
    sound.unloadAsync();
  }

  useEffect(() => {
    setStation(station);
    return sound
      ? () => {
          console.log('Unloading Sound');
          sound.unloadAsync();
        }
      : undefined;
  }, [station]);

  const handleStationChange = (station: object) => {
    setStation(station);
  };

  return (
    <UrlContext.Provider value={station}>
      <UrlUpdateContext.Provider value={handleStationChange}>
        {children}
      </UrlUpdateContext.Provider>
    </UrlContext.Provider>
  );
};
