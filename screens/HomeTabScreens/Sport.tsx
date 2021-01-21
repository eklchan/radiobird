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

const Sport = () => {
  const setStation: Function = useUrlUpdate();

  let [fontsLoaded] = useFonts({
    Lato_900Black,
    Lato_700Bold,
    Lato_400Regular,
  });

  const filtered = stationsuk.filter((station) => {
    const tagArray = station.tags;
    const filterWords = ['sport', 'tennis', 'football'];

    if (contains(tagArray, filterWords)) {
      return station;
    }
  });

  const sortPopularity = filtered.sort((a, b) => b.votes - a.votes);

  const renderFiltered = sortPopularity.slice(0, 10).map((station) => {
    const [source, setSource] = useState(
      station.favicon ? station.favicon : 'nofavicon',
    );

    const handleCardPress = () => {
      setStation(station);
    };

    return (
      <TouchableOpacity
        onPress={handleCardPress}
        activeOpacity={0.7}
        key={station.stationuuid}
      >
        <Card style={styles.card}>
          <View style={styles.stationContainer}>
            <Image
              source={{ uri: `${source}` }}
              style={styles.faviconImage}
              onError={() =>
                setSource(
                  'https://static.heart.co.uk/assets_v4r/heart/img/favicon-196x196.png',
                )
              }
            />
            <View style={styles.stationTextWrap}>
              <View style={styles.stationNameWrap}>
                <Text style={styles.stationName}>{station.name}</Text>
              </View>
              <Text>{station.state}</Text>
            </View>
          </View>
        </Card>
      </TouchableOpacity>
    );
  });

  if (!fontsLoaded) {
    return <Spinner style={styles.loadingSpinner} />;
  } else {
    return (
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Most Popular Sport Channels:</Text>
        <View>{renderFiltered}</View>
      </ScrollView>
    );
  }
};

export default Sport;

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
