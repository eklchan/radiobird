import React, { useEffect, useState, FunctionComponent } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Card } from 'native-base';

type ListItemCardProps = {
  station: object;
  setStation: Function;
};

const ListItemCard: FunctionComponent<ListItemCardProps> = ({
  station,
  setStation,
}) => {
  const [source, setSource] = useState(
    station.favicon ? station.favicon : 'nofavicon',
  );

  const handleCardPress = () => {
    setStation(station);
  };

  useEffect(() => {
    setSource(station.favicon);
  }, [station.favicon]);

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
            key={station.stationuuid}
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
};

export default ListItemCard;

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
});
