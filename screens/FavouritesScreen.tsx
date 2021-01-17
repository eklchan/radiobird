import React from 'react';
import { View, Text } from 'react-native';
import { useUrl, useUrlUpdate } from '../Context';

const FavouritesScreen = () => {
  const stationUrl = useUrl();
  const setStationUrl = useUrlUpdate();

  console.log(stationUrl, 'HITHERE');

  return (
    <View>
      <Text>FavouritesScreen</Text>
    </View>
  );
};

export default FavouritesScreen;
