import { Spinner } from 'native-base';
import React, { useEffect, useState, useCallback } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import ListItemCard from '../components/ListItemCard';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useUrlUpdate } from '../Context';
import stationsuk from '../stationsuk.json';
import { shuffle } from '../utils/utils';

const LocalScreen = () => {
  const [localRadioArray, setLocalRadioArray] = useState<object[]>([]);
  const [loadingState, setLoadingState] = useState(true);
  const [stations, setStations] = useState(10);
  const isFocused = useIsFocused();
  const setStation = useUrlUpdate();

  useEffect(() => {
    const fetchLocal = async () => {
      let localRadio = stationsuk.filter((station) => {
        return station.state === 'London';
      });
      let shuffledLocal = shuffle(localRadio);
      setLocalRadioArray(shuffledLocal);
      setLoadingState(false);
    };
    if (isFocused) {
      fetchLocal();
    }
  }, [isFocused]);

  const handleStationPress = useCallback(
    async (clickedStation: object) => {
      await setStation(clickedStation);
    },
    [setStation],
  );

  const renderItem = useCallback(
    ({ item }) => (
      <TouchableOpacity onPress={() => handleStationPress(item)}>
        <ListItemCard station={item} />
      </TouchableOpacity>
    ),
    [handleStationPress],
  );
  let renderArray = localRadioArray.slice(0, stations);

  const keyExtractor = useCallback((item) => item.stationuuid, []);

  if (loadingState) {
    return <Spinner style={styles.loadingSpinner} />;
  } else {
    return (
      <View style={styles.container}>
        <>
          <FlatList
            maxToRenderPerBatch={8}
            initialNumToRender={8}
            removeClippedSubviews={true}
            showsVerticalScrollIndicator={false}
            windowSize={6}
            data={renderArray}
            renderItem={renderItem}
            keyExtractor={keyExtractor}
            onEndReached={() => {
              setStations(stations + 5);
            }}
          />
        </>
      </View>
    );
  }
};

export default LocalScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    marginHorizontal: 10,
  },
  clearAllButton: {
    alignSelf: 'center',
    borderRadius: 10,
    marginVertical: 24,
  },
  buttonText: {
    fontSize: 22.5,
    padding: 22,
    color: '#ebebeb',
  },
  loadingSpinner: {
    alignSelf: 'center',
    marginTop: 10,
  },
});
