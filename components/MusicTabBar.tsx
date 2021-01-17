import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useUrl } from '../Context';
import { AntDesign } from '@expo/vector-icons';
import { Button } from 'native-base';

const MusicTabBar = ({ navigation }) => {
  const station: any = useUrl();

  const handleButtonPress = () => {
    console.log('Press');
  };

  return (
    <>
      {station && (
        <View style={styles.container}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Player');
            }}
            style={styles.touchable}
          >
            <Image
              source={{ uri: `${station.favicon}` }}
              style={styles.image}
            />
            <Text style={styles.stationName}>{station.name}</Text>
          </TouchableOpacity>
          <Button style={styles.playButton} onPress={handleButtonPress} rounded>
            <AntDesign name="caretright" size={24} color="black" />
          </Button>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 60,
    flexDirection: 'row',
  },
  touchable: {
    flexDirection: 'row',
  },
  image: {
    height: 60,
    width: 60,
    marginRight: 20,
  },
  stationName: {
    alignSelf: 'center',
  },
  playButton: {
    alignSelf: 'center',
    marginLeft: 'auto',
    marginRight: 20,
    padding: 10,
  },
});

export default MusicTabBar;

{
  /* <Button
  title="Go somewhere"
  onPress={() => {
    navigation.navigate('Player');
  }}
/> */
}
