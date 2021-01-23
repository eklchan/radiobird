import React, { useEffect, useState } from 'react';
import { StyleSheet, Image, Text, View, FlatList } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import stationsuk from '../../stationsuk.json';
import { useUrlUpdate } from '../../Context';
import { Spinner } from 'native-base';
import {
  useFonts,
  Lato_900Black,
  Lato_700Bold,
  Lato_400Regular,
} from '@expo-google-fonts/lato';
import { getRecents } from '../../utils/localStorageRecents';
import { useIsFocused } from '@react-navigation/native';
import SideScrollCard from '../../components/SideScrollCard';

const ForYou = () => {
  let [fontsLoaded] = useFonts({
    Lato_900Black,
    Lato_700Bold,
    Lato_400Regular,
  });

  const setStation = useUrlUpdate();
  const isFocused = useIsFocused();
  const [recentArray, setRecentArray] = useState([]);
  const [fetchComplete, setFetchComplete] = useState(false);

  useEffect(() => {
    const fetchRecents = async () => {
      let recentListens = await getRecents();
      setRecentArray(recentListens);
      setFetchComplete(true);
    };
    fetchRecents();
  }, [isFocused]);

  const renderRecents = recentArray.map((station, id) => {
    return (
      <SideScrollCard key={id} station={station} setStation={setStation} />
    );
  });

  const sortedStations = stationsuk.sort((a, b) => b.votes - a.votes);

  const renderStations = sortedStations.slice(0, 8).map((station, id) => {
    return (
      <SideScrollCard key={id} station={station} setStation={setStation} />
    );
  });

  if (!fontsLoaded || !fetchComplete) {
    return <Spinner style={styles.loadingSpinner} />;
  } else {
    return (
      <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
        {recentArray.length > 0 && (
          <>
            <Text style={styles.headerText}>Recently Listened</Text>
            <FlatList
              horizontal={true}
              style={styles.stationWrapper}
              // showsHorizontalScrollIndicator={false}
            >
              {renderRecents}
            </FlatList>
          </>
        )}
        <Text style={styles.headerText}>National</Text>
        <FlatList
          horizontal={true}
          style={styles.stationWrapper}
          // showsHorizontalScrollIndicator={false}
        >
          {renderStations}
        </FlatList>
        <Text style={styles.headerText}>Local Radio</Text>
        <FlatList
          horizontal={true}
          style={styles.stationWrapper}
          // showsHorizontalScrollIndicator={false}
        >
          {renderStations}
        </FlatList>
        <Text style={styles.headerText}>Listen By Category</Text>
        <FlatList
          horizontal={true}
          style={styles.stationWrapper}
          // showsHorizontalScrollIndicator={false}
        >
          <Text>CATEGORY</Text>
        </FlatList>
      </ScrollView>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    paddingTop: 15,
    paddingBottom: 25,
  },
  stationWrapper: {
    flex: 1,
    flexDirection: 'row',
  },
  headerText: {
    fontSize: 18,
    marginLeft: 10,
    fontFamily: 'Lato_700Bold',
  },
  loadingSpinner: {
    alignSelf: 'center',
    marginTop: 10,
  },
});

export default ForYou;
