import AsyncStorage from '@react-native-async-storage/async-storage';

export const getFavourites = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('favouriteRadios');
    return jsonValue != null ? JSON.parse(jsonValue) : [];
  } catch (e) {
    console.log('Error GET', e);
    return [];
  }
};

export const storeFavourites = async (value) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem('favouriteRadios', jsonValue);
  } catch (e) {
    console.log('error STORE', e);
  }
};

export const addToFavourites = async (value) => {
  let favourites = await getFavourites();

  const stationIndex = favourites.findIndex((alreadyFavourited) => {
    return alreadyFavourited.stationuuid === value.stationuuid;
  });

  if (stationIndex !== -1) {
  } else {
    favourites.push(value);
  }

  await storeFavourites(favourites);
};

export const deleteFromFavourites = async (value) => {
  let favourites = await getFavourites();

  const stationIndex = favourites.findIndex((alreadyFavourited) => {
    return alreadyFavourited.stationuuid === value.stationuuid;
  });

  if (stationIndex !== -1) {
    favourites.splice(stationIndex, 1);
  }
  storeFavourites(favourites);
};

export const favouritedOrNot = async (value) => {
  let favourites = await getFavourites();

  const stationIndex = favourites.findIndex((alreadyFavourited) => {
    return alreadyFavourited.stationuuid === value.stationuuid;
  });

  if (stationIndex !== -1) {
    return true;
  } else {
    return false;
  }
};
