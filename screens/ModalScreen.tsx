import React from 'react';
import { View, Text, Image, StyleSheet, ActivityIndicator } from 'react-native';
import {
  useUrl,
  useHandlePlayContext,
  useHandlePauseContext,
  useAudioPlayingContext,
  useLoadingContext,
} from '../Context';
import {
  AntDesign,
  Ionicons,
  MaterialCommunityIcons,
} from '@expo/vector-icons';
import { Badge, Button } from 'native-base';

const ModalScreen = () => {
  const station: any = useUrl();
  const loadingAudio: boolean = useLoadingContext();
  const handlePauseSound: Function = useHandlePauseContext();
  const handlePlaySound: Function = useHandlePlayContext();
  const audioPlaying: boolean = useAudioPlayingContext();

  const uniqueTags: Array<string> = Array.from(
    new Set(station.tags.split(',')),
  );

  const renderTags = uniqueTags.map((tag: string) => {
    return (
      <Badge style={styles.badges} key={tag}>
        <Text style={styles.tagText}>{tag}</Text>
      </Badge>
    );
  });

  const renderLanguages = station.language
    .split(',')
    .map((language: string) => {
      return (
        <Text key={language} style={styles.languageText}>
          {language}{' '}
        </Text>
      );
    });

  const handlePausePress = () => {
    handlePauseSound();
  };

  const handlePlayPress = () => {
    handlePlaySound();
  };

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: `${station.favicon}` }}
        key={station.name}
        style={styles.image}
      />
      <Text>{station.name}</Text>
      <Text style={styles.countryText}>{station.country}</Text>
      <View style={styles.languageContainer}>{renderLanguages}</View>
      <Text>{station.bitrate}</Text>
      <View style={styles.tagContainer}>{renderTags}</View>
      <View style={styles.buttonContainers}>
        <AntDesign name="staro" size={24} color="black" />
        {audioPlaying && !loadingAudio ? (
          <Button
            style={styles.playPauseButton}
            onPress={handlePausePress}
            rounded
          >
            <Ionicons
              name="pause-sharp"
              size={24}
              color="black"
              style={styles.playPauseIcon}
            />
          </Button>
        ) : (
          <Button
            style={styles.playPauseButton}
            onPress={handlePlayPress}
            rounded
          >
            <AntDesign
              name="caretright"
              size={24}
              color="black"
              style={styles.playPauseIcon}
            />
          </Button>
        )}
        {loadingAudio && (
          <ActivityIndicator
            size="large"
            color="#00ff00"
            style={styles.playPauseButton}
          />
        )}
        <MaterialCommunityIcons name="sleep" size={24} color="black" />
      </View>
    </View>
  );
};

export default ModalScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 10,
  },

  image: {
    height: 160,
    width: 160,
  },
  tagText: {
    textTransform: 'capitalize',
  },
  tagContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  badges: {
    margin: 5,
  },
  countryText: {
    textAlign: 'center',
  },
  languageText: {
    textTransform: 'capitalize',
  },
  languageContainer: {
    flexDirection: 'row',
  },
  playPauseButton: {
    height: 75,
    width: 75,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  playPauseIcon: {
    // alignSelf: 'center',
  },
  buttonContainers: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: '90%',
  },
});
