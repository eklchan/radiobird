import React, { useState } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import stationsuk from '../../stationsuk.json';
import { Card, Spinner } from 'native-base';
import {
  useFonts,
  Lato_900Black,
  Lato_700Bold,
  Lato_400Regular,
} from '@expo-google-fonts/lato';
import { contains } from '../../utils/utils';
import { useUrlUpdate } from '../../Context';
import ListItemCard from '../../components/ListItemCard';

const News = () => {
  const setStation: Function = useUrlUpdate();

  let [fontsLoaded] = useFonts({
    Lato_900Black,
    Lato_700Bold,
    Lato_400Regular,
  });

  const filtered = stationsuk.filter((station) => {
    const tagString = station.tags;
    const filterWords = ['news', 'talk'];

    if (contains(tagString, filterWords)) {
      return station;
    }
  });
  const sortPopularity = filtered.sort((a, b) => b.votes - a.votes);

  const renderFiltered = sortPopularity.slice(0, 10).map((station, i) => {
    return (
      <TouchableOpacity activeOpacity={0.7} key={station.stationuuid}>
        <ListItemCard station={station} />
      </TouchableOpacity>
    );
  });

  if (!fontsLoaded) {
    return <Spinner style={styles.loadingSpinner} />;
  } else {
    return (
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Most Popular News Channels:</Text>
        <View>{renderFiltered}</View>
      </ScrollView>
    );
  }
};

export default News;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    marginHorizontal: 12,
  },
  faviconImage: {
    height: 110,
    width: 110,
    borderRadius: 17,
  },
  title: {
    fontSize: 18,
    fontFamily: 'Lato_900Black',
    marginBottom: 15,
  },
  stationContainer: {
    flexDirection: 'row',
    padding: 5,
  },
  stationTextWrap: {
    marginLeft: 20,
    marginTop: 10,
  },
  stationName: {
    fontSize: 16,
    fontFamily: 'Lato_400Regular',
    flexShrink: 1,
  },
  stationNameWrap: {
    flexDirection: 'row',
  },
  card: {
    height: 120,
    width: '99.2%',
    borderRadius: 15,
  },
  loadingSpinner: {
    alignSelf: 'center',
    marginTop: 10,
  },
});
