import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import {
  ScrollView,
  TouchableHighlight,
  TouchableOpacity,
} from 'react-native-gesture-handler';
import stationsuk from '../../stationsuk.json';
import { useUrlUpdate } from '../../Context';
import { Spinner, Icon, Button } from 'native-base';
import {
  useFonts,
  Lato_900Black,
  Lato_700Bold,
  Lato_400Regular,
} from '@expo-google-fonts/lato';
import { getRecents } from '../../utils/localStorageRecents';
import { useIsFocused } from '@react-navigation/native';
import { Ionicons, FontAwesome5, MaterialIcons } from '@expo/vector-icons';
import SideScrollCard from '../../components/SideScrollCard';
import SideScrollCardSmall from '../../components/SideScrollCardSmall';

const sortedUKStations: Array<object> = [...stationsuk].sort(
  (a, b) => b.votes - a.votes,
);
const sortedLocalStations: Array<object> = [...stationsuk].sort(
  (a, b) => a.votes - b.votes,
);

const ForYou = ({ jumpTo }) => {
  let [fontsLoaded] = useFonts({
    Lato_900Black,
    Lato_700Bold,
    Lato_400Regular,
  });

  const categoryIconSize = 62;
  const buttonOpacity = 0.9;
  const underlayColour = '#cfcfcf';

  const setStation = useUrlUpdate();
  const isFocused = useIsFocused();
  const [recentArray, setRecentArray] = useState([]);
  // eslint-disable-next-line prettier/prettier
  const [renderNationalStations, setRenderNationalStations] = useState<object[]>([]);
  const [renderLocalStations, setRenderLocalStations] = useState<object[]>([]);
  const [fetchComplete, setFetchComplete] = useState(false);

  useEffect(() => {
    const fetchRecents = async () => {
      let recentListens = await getRecents();
      recentListens = recentListens.slice(0, 7);
      setRecentArray(recentListens);
      setFetchComplete(true);
    };
    fetchRecents();
  }, [isFocused]);

  useEffect(() => {
    setRenderNationalStations(sortedUKStations.slice(0, 6));
    setRenderLocalStations(sortedLocalStations.slice(0, 6));
  }, []);

  const loadMoreNational = () => {
    let startPoint = renderNationalStations.length;
    let endPoint = renderNationalStations.length;
    if (endPoint < 15) {
      setRenderNationalStations([
        ...renderNationalStations,
        ...sortedUKStations.slice(startPoint, endPoint + 6),
      ]);
    }
  };

  const loadMoreLocal = () => {
    let startPoint = renderLocalStations.length;
    let endPoint = renderLocalStations.length;
    if (endPoint < 15) {
      setRenderLocalStations([
        ...renderLocalStations,
        ...sortedLocalStations.slice(startPoint, endPoint + 5),
      ]);
    }
  };

  const handleStationPress = async (clickedStation: object) => {
    await setStation(clickedStation);
  };

  if (!fontsLoaded || !fetchComplete) {
    return <Spinner style={styles.loadingSpinner} />;
  } else {
    return (
      <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
        {recentArray.length > 0 && (
          <>
            <TouchableHighlight
              activeOpacity={buttonOpacity}
              underlayColor={underlayColour}
              onPress={() => {
                console.log('HAPPY');
              }}
            >
              <View style={styles.headerWrap}>
                <Text style={styles.headerText}>Recent Listens</Text>
                <Icon name="arrow-forward" style={{ fontSize: 23 }} />
              </View>
            </TouchableHighlight>
            <FlatList
              maxToRenderPerBatch={5}
              initialNumToRender={5}
              removeClippedSubviews={true}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              data={recentArray}
              renderItem={({ item }) => (
                <TouchableOpacity onPress={() => handleStationPress(item)}>
                  <SideScrollCardSmall station={item} />
                </TouchableOpacity>
              )}
              keyExtractor={(item) => item.stationuuid}
            />
          </>
        )}
        <TouchableHighlight
          activeOpacity={buttonOpacity}
          underlayColor={underlayColour}
          onPress={() => {
            console.log('HAPPY');
          }}
        >
          <View style={styles.headerWrap}>
            <Text style={styles.headerText}>National</Text>
            <Icon name="arrow-forward" style={{ fontSize: 23 }} />
          </View>
        </TouchableHighlight>
        <FlatList
          maxToRenderPerBatch={5}
          initialNumToRender={5}
          removeClippedSubviews={true}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          data={renderNationalStations}
          onEndReached={() => {
            loadMoreNational();
          }}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handleStationPress(item)}>
              <SideScrollCard station={item} />
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.stationuuid}
        />
        <TouchableHighlight
          activeOpacity={buttonOpacity}
          underlayColor={underlayColour}
          onPress={() => {
            console.log('HAPPY');
          }}
        >
          <View style={styles.headerWrap}>
            <Text style={styles.headerText}>Local </Text>
            <Icon name="arrow-forward" style={{ fontSize: 23 }} />
          </View>
        </TouchableHighlight>
        <FlatList
          maxToRenderPerBatch={5}
          initialNumToRender={5}
          removeClippedSubviews={true}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          data={renderLocalStations}
          onEndReached={() => {
            loadMoreLocal();
          }}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handleStationPress(item)}>
              <SideScrollCard station={item} />
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.stationuuid}
        />
        <Text style={styles.headerText}>Listen By Category</Text>
        <ScrollView
          horizontal={true}
          style={styles.categoryWrapper}
          showsHorizontalScrollIndicator={false}
        >
          <Button
            rounded
            style={styles.categoryButtonWrap}
            onPress={() => {
              jumpTo('news');
            }}
          >
            <Ionicons
              name="newspaper-outline"
              size={categoryIconSize}
              color="black"
            />
          </Button>
          <Button
            rounded
            style={styles.categoryButtonWrap}
            onPress={() => {
              jumpTo('music');
            }}
          >
            <FontAwesome5
              name="music"
              size={categoryIconSize - 2}
              color="black"
            />
          </Button>
          <Button
            rounded
            style={styles.categoryButtonWrap}
            onPress={() => {
              jumpTo('sports');
            }}
          >
            <MaterialIcons
              name="sports-tennis"
              size={categoryIconSize}
              color="black"
            />
          </Button>
        </ScrollView>
        <View style={{ height: 15 }} />
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
    fontSize: 19,
    marginLeft: 10,
    fontFamily: 'Lato_700Bold',
  },
  loadingSpinner: {
    alignSelf: 'center',
    marginTop: 10,
  },
  headerWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '93%',
    paddingVertical: 2,
  },
  categoryWrapper: {
    marginVertical: 18,
  },
  categoryButtonWrap: {
    height: 115,
    width: 115,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 13,
    backgroundColor: '#437ed1',
  },
});

export default ForYou;
