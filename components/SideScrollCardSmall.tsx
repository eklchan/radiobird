import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';
import { Card } from 'native-base';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Station } from '../interfaces';
const Logo = require('../assets/radioIcon.png');

interface props {
  station: Station;
}

const SideScrollCard = ({ station }: props) => {
  const [source, setSource] = useState(station.favicon);

  useEffect(() => {
    setSource(station.favicon);
  }, [station.favicon]);

  const handleError = () => {
    setSource('');
  };

  return (
    <View style={styles.station} key={station.name}>
      <TouchableOpacity style={styles.button} activeOpacity={0.65}>
        <Card style={styles.card}>
          <Image
            onError={handleError}
            source={source ? { uri: `${source}` } : Logo}
            style={styles.faviconImage}
            key={station.name}
          />
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
    width: 95,
    height: 160,
    overflow: 'hidden',
    alignSelf: 'center',
    flex: 1,
  },
  headerText: {
    fontSize: 18,
    marginLeft: 10,
    fontFamily: 'Lato_700Bold',
  },
  stationName: {
    fontSize: 14,
    padding: 2,
    margin: 2,
    fontFamily: 'Lato_400Regular',
  },
  loadingSpinner: {
    alignSelf: 'center',
    marginTop: 10,
  },
  faviconImage: {
    height: 90,
    width: 90,
    borderRadius: 15,
  },
  card: { borderRadius: 15 },
  button: {},
});

export default SideScrollCard;
