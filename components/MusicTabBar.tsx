import React, { useEffect, useState } from 'react';
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

  // console.log(audioPlaying, 'AUDIO PLAYING');

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
            <ActivityIndicator
              size="large"
              color="#00ff00"
              style={styles.playButton}
            />
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
              rounded
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
