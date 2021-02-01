import AsyncStorage from '@react-native-async-storage/async-storage';
import { Station } from '../interfaces';

export const getRecents = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('recentListens');
    return jsonValue != null ? JSON.parse(jsonValue) : [];
  } catch (e) {
    console.log('Error GET', e);
    return [];
  }
};

export const storeRecents = async (value: Array<Station>) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem('recentListens', jsonValue);
    return true;
  } catch (e) {
    console.log('error STORE', e);
  }
};

export const addToRecents = async (value: Station) => {
  let recents = await getRecents();

  const stationIndex = recents.findIndex((alreadyListened: Station) => {
    return alreadyListened.stationuuid === value.stationuuid;
  });

  if (stationIndex !== -1) {
    recents.splice(stationIndex, 1);
    recents.unshift(value);
  } else {
    recents.unshift(value);
  }
  storeRecents(recents);
};

export const clearAllRecents = async () => {
  return await storeRecents([]);
};
