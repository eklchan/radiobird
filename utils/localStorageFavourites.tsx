import AsyncStorage from '@react-native-async-storage/async-storage';
import { Station } from '../interfaces';

export const getFavourites = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('favouriteRadios');
    return jsonValue != null ? JSON.parse(jsonValue) : [];
  } catch (e) {
    console.log('Error GET', e);
    return [];
  }
};

export const storeFavourites = async (value: Array<Station>) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem('favouriteRadios', jsonValue);
    return true;
  } catch (e) {
    console.log('error STORE', e);
  }
};

export const addToFavourites = async (value: Station) => {
  let favourites = await getFavourites();

  const stationIndex = favourites.findIndex((alreadyFavourited: Station) => {
    return alreadyFavourited.stationuuid === value.stationuuid;
  });

  if (stationIndex !== -1) {
  } else {
    favourites.push(value);
  }

  await storeFavourites(favourites);
};

export const deleteFromFavourites = async (value: Station) => {
  let favourites = await getFavourites();

  const stationIndex = favourites.findIndex((alreadyFavourited: Station) => {
    return alreadyFavourited.stationuuid === value.stationuuid;
  });

  if (stationIndex !== -1) {
    favourites.splice(stationIndex, 1);
  }
  storeFavourites(favourites);
};

export const deleteAllFavourties = async () => {
  const resp = await storeFavourites([]);
  return resp;
};

export const favouritedOrNot = async (value: Station) => {
  let favourites = await getFavourites();

  const stationIndex = favourites.findIndex((alreadyFavourited: Station) => {
    return alreadyFavourited.stationuuid === value.stationuuid;
  });

  if (stationIndex !== -1) {
    return true;
  } else {
    return false;
  }
};
