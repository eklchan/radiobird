import React, { useState } from 'react';
import { StyleSheet, Image, Text, View } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import stationsuk from '../../stationsuk.json';
import { useUrlUpdate } from '../../Context';
import { Card, Spinner } from 'native-base';
import {
  useFonts,
  Lato_900Black,
  Lato_700Bold,
  Lato_400Regular,
} from '@expo-google-fonts/lato';

const ForYou = () => {
  let [fontsLoaded] = useFonts({
    Lato_900Black,
    Lato_700Bold,
    Lato_400Regular,
  });

  const setStation = useUrlUpdate();

  const sortedStations = stationsuk.sort((a, b) => b.votes - a.votes);

  const renderStations = sortedStations.slice(0, 8).map((station, i) => {
    const [source, setSource] = useState(station.favicon);

    const handleError = () => {
      setSource(
        'https://static.heart.co.uk/assets_v4r/heart/img/favicon-196x196.png',
      );
    };

    const handleClick = async () => {
      console.log('CLICK', station.name, station.url_resolved, 'poo');
      setStation(station);
    };

    return (
      <View style={styles.station} key={station.name}>
        <TouchableOpacity
          onPress={handleClick}
          style={styles.button}
          activeOpacity={0.65}
        >
          <Card style={{ borderRadius: 17 }}>
            {/* <CardItem> */}
            {/* <Body> */}
            <Image
              onError={handleError}
              source={{ uri: `${source}` }}
              style={styles.faviconImage}
              key={station.name}
            />
            {/* </Body> */}
            {/* </CardItem> */}
          </Card>
        </TouchableOpacity>
        <Text style={styles.stationName}>{station.name}</Text>
      </View>
    );
  });
  if (!fontsLoaded) {
    return <Spinner style={styles.loadingSpinner} />;
  } else {
    return (
      <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
        <Text style={styles.headerText}>Recently Listened</Text>
        <ScrollView
          horizontal={true}
          style={styles.stationWrapper}
          showsHorizontalScrollIndicator={false}
        >
          {renderStations}
        </ScrollView>
        <Text style={styles.headerText}>Local Radio</Text>
        <ScrollView
          horizontal={true}
          style={styles.stationWrapper}
          showsHorizontalScrollIndicator={false}
        >
          {renderStations}
        </ScrollView>
        <Text style={styles.headerText}>National</Text>
        <ScrollView
          horizontal={true}
          style={styles.stationWrapper}
          showsHorizontalScrollIndicator={false}
        >
          {renderStations}
        </ScrollView>
        <Text style={styles.headerText}>Listen By Category</Text>
        <ScrollView
          horizontal={true}
          style={styles.stationWrapper}
          showsHorizontalScrollIndicator={false}
        >
          {renderStations}
        </ScrollView>
      </ScrollView>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    paddingTop: 15,
  },
  stationWrapper: {
    flex: 1,
    flexDirection: 'row',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  station: {
    margin: 10,
    width: 122,
    height: 180,
    overflow: 'hidden',
    alignSelf: 'center',
    flex: 1,
  },
  button: {
    // backgroundColor: 'grey',
  },
  scroll: {
    color: 'white',
  },
  headerText: {
    fontSize: 18,
    marginLeft: 10,
    fontFamily: 'Lato_700Bold',
  },
  stationName: {
    fontSize: 15,
    padding: 2,
    margin: 2,
    fontFamily: 'Lato_400Regular',
  },
  loadingSpinner: {
    alignSelf: 'center',
    marginTop: 10,
  },
  faviconImage: {
    height: 120,
    width: 120,
    borderRadius: 17,
  },
});

export default ForYou;
