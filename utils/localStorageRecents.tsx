import AsyncStorage from '@react-native-async-storage/async-storage';

export const getRecents = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('recentListens');
    return jsonValue != null ? JSON.parse(jsonValue) : [];
  } catch (e) {
    console.log('Error GET', e);
    return [];
  }
};

export const storeRecents = async (value) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem('recentListens', jsonValue);
  } catch (e) {
    console.log('error STORE', e);
  }
};

export const addToRecents = async (value) => {
  let recents = await getRecents();

  const stationIndex = recents.findIndex((alreadyListened) => {
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
  await storeRecents([]);
};
