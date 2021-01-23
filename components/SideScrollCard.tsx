import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';
import { Card } from 'native-base';
import { TouchableOpacity } from 'react-native-gesture-handler';

const SideScrollCard = ({ station, setStation }) => {
  const [source, setSource] = useState(station.favicon);

  useEffect(() => {
    setSource(station.favicon);
  }, [station.favicon]);

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
};

const styles = StyleSheet.create({
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

export default SideScrollCard;
