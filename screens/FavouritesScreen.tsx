import React from 'react';
import { View, Text } from 'react-native';
import { getFavourites } from '../utils/localStorage';

let response;
const fetchData = async () => {
  response = await getFavourites();
};
fetchData();

const FavouritesScreen = () => {
  return (
    <View>
      <Text>FavouritesScreen</Text>
    </View>
  );
};

export default FavouritesScreen;
