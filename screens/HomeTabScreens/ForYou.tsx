import React, { useState, useEffect } from 'react';
import { StyleSheet, Image, Text, View, Button } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import stationsuk from '../../stationsuk.json';
import { useUrl, useUrlUpdate } from '../../Context';

const ForYou = () => {
  const setStation = useUrlUpdate();

  // const handleStop = () => {
  //   sound.unloadAsync();
  // };

  // const handleTest = async () => {
  //   const hi = await sound.getStatusAsync();
  //   console.log(hi, 'HI');
  // };

  const sortedStations = stationsuk.sort((a, b) => b.votes - a.votes);

  const renderStations = sortedStations.slice(0, 20).map((station, i) => {
    const [source, setSource] = useState(station.favicon);

    const handleError = () => {
      // console.log('ERROR', station.name);
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
        <TouchableOpacity onPress={handleClick} style={styles.button}>
          <Image
            onError={handleError}
            source={{ uri: `${source}` }}
            style={{ height: 120, width: 120, margin: 5 }}
            key={station.name}
          />
          <Text>{station.name}</Text>
        </TouchableOpacity>
      </View>
    );
  });

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
      <Text>Recently Listened</Text>
      <ScrollView horizontal={true} style={styles.stationWrapper}>
        {renderStations}
      </ScrollView>
      <Text>Local Radio</Text>
      <ScrollView horizontal={true} style={styles.stationWrapper}>
        {renderStations}
      </ScrollView>
      <Text>National</Text>
      <ScrollView horizontal={true} style={styles.stationWrapper}>
        {renderStations}
      </ScrollView>
      <Text>Listen By Category</Text>
      <ScrollView horizontal={true} style={styles.stationWrapper}>
        {renderStations}
      </ScrollView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
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
    width: 130,
    height: 180,
    overflow: 'hidden',
    alignSelf: 'center',
    flex: 1,
  },
  button: {
    backgroundColor: 'grey',
  },
  scroll: {
    color: 'white',
  },
});

export default ForYou;
