import React from 'react';
import { View, Text, StyleSheet, Image, ActivityIndicator } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {
  useUrl,
  useLoadingContext,
  useHandlePauseContext,
  useHandlePlayContext,
  useAudioPlayingContext,
} from '../Context';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import { Button } from 'native-base';

const MusicTabBar = ({ navigation }) => {
  const station: any = useUrl();
  const loadingAudio: boolean = useLoadingContext();
  const handlePauseSound: Function = useHandlePauseContext();
  const handlePlaySound: Function = useHandlePlayContext();
  const audioPlaying: boolean = useAudioPlayingContext();

  const handlePausePress = () => {
    handlePauseSound();
  };

  const handlePlayPress = () => {
    handlePlaySound();
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
          {loadingAudio && (
            <View style={styles.playButton}>
              <ActivityIndicator size={24} color="#00ff00" />
            </View>
          )}
          {!audioPlaying && !loadingAudio && (
            <Button style={styles.playButton} onPress={handlePlayPress} rounded>
              <AntDesign name="caretright" size={24} color="black" />
            </Button>
          )}
          {audioPlaying && !loadingAudio && (
            <Button
              style={styles.playButton}
              onPress={handlePausePress}
              // transparent
              iconLeft
            >
              <Ionicons name="pause-sharp" size={24} color="black" />
            </Button>
          )}
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 60,
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: 'rgba(128,128,128, 0.3)',
    backgroundColor: '#f7f7f7',
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
    fontSize: 16,
    fontWeight: 'bold',
  },
  playButton: {
    alignSelf: 'center',
    marginLeft: 'auto',
    justifyContent: 'center',
    marginRight: 20,
    padding: 10,
    borderRadius: 50,
    backgroundColor: 'rgba(200,200,200, 0.9)',
  },
});

export default MusicTabBar;
