import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { getFavourites } from '../utils/localStorage';
import { Spinner } from 'native-base';
import { useUrlUpdate } from '../Context';
import {
  useFonts,
  Lato_900Black,
  Lato_700Bold,
  Lato_400Regular,
} from '@expo-google-fonts/lato';
import ListItemCard from '../components/ListItemCard';
import { useIsFocused } from '@react-navigation/native';

const FavouritesScreen = () => {
  const setStation: Function = useUrlUpdate();
  const [favouritesArray, setFavouritesArray] = useState([]);
  const isFocused = useIsFocused();

  let [fontsLoaded] = useFonts({
    Lato_900Black,
    Lato_700Bold,
    Lato_400Regular,
  });

  useEffect(() => {
    const fetchData = async () => {
      const storageResponse = await getFavourites();
      setFavouritesArray(storageResponse);
    };
    fetchData();
  }, [isFocused]);

  const renderFavouritesList = favouritesArray.map((station) => {
    return (
      <ListItemCard
        station={station}
        setStation={setStation}
        key={station.stationuuid}
      />
    );
  });

  if (!fontsLoaded) {
    return <Spinner style={styles.loadingSpinner} />;
  } else {
    return (
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View>{renderFavouritesList}</View>
      </ScrollView>
    );
  }
};

export default FavouritesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    marginHorizontal: 12,
  },

  title: {
    fontSize: 18,
    fontFamily: 'Lato_900Black',
    marginBottom: 15,
  },
  loadingSpinner: {
    alignSelf: 'center',
    marginTop: 10,
  },
});
