import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import ListItemCard from '../components/ListItemCard';
import { useUrlUpdate } from '../Context';
import {
  useFonts,
  Lato_900Black,
  Lato_700Bold,
  Lato_400Regular,
} from '@expo-google-fonts/lato';
import { Spinner } from 'native-base';

const SearchScreen = ({ filteredStations, input, loadingState }) => {
  let [fontsLoaded] = useFonts({
    Lato_900Black,
    Lato_700Bold,
    Lato_400Regular,
  });
  const setStation: Function = useUrlUpdate();
  const inputLength = input.split('').length;
  // console.log(loadingState, filteredStations.length, inputLength);

  if (!fontsLoaded || loadingState) {
    return <Spinner style={styles.loadingSpinner} />;
  } else {
    return (
      <View style={styles.container}>
        {!loadingState && filteredStations.length === 0 && inputLength > 2 && (
          <Text style={styles.headerText}>No Results Found</Text>
        )}
        {inputLength > 2 && filteredStations.length > 0 && (
          <FlatList
            data={filteredStations}
            maxToRenderPerBatch={8}
            initialNumToRender={8}
            windowSize={15}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => {
                  setStation(item);
                }}
              >
                <ListItemCard station={item} />
              </TouchableOpacity>
            )}
            keyExtractor={(item) => item.stationuuid}
            ListHeaderComponent={() => (
              <View>
                <Text style={styles.headerText}>Search Results: </Text>
              </View>
            )}
          />
        )}
      </View>
    );
  }
};

export default SearchScreen;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 15,
    paddingTop: 15,
  },
  headerText: {
    fontSize: 18,
    marginVertical: 2,
    fontFamily: 'Lato_700Bold',
  },
  loadingSpinner: {
    alignSelf: 'center',
    marginTop: 10,
  },
});
