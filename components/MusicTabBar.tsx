import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, ActivityIndicator } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {
  useUrl,
  useLoadingContext,
  useHandlePauseContext,
  useHandlePlayContext,
  useAudioPlayingContext,
  useSleepTimeContext,
} from '../Context';
import { AntDesign, Ionicons, FontAwesome } from '@expo/vector-icons';
import { Badge, Button } from 'native-base';
import { formatTime } from '../utils/utils';

const MusicTabBar = ({ navigation }) => {
  const station: any = useUrl();
  const loadingAudio: boolean = useLoadingContext();
  const handlePauseSound: Function = useHandlePauseContext();
  const handlePlaySound: Function = useHandlePlayContext();
  const audioPlaying: boolean = useAudioPlayingContext();
  const sleepTime: number = useSleepTimeContext();

  const [source, setSource] = useState(station.favicon);

  useEffect(() => {
    setSource(station.favicon);
  }, [station.favicon]);

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
              source={
                source
                  ? { uri: `${source}` }
                  : {
                      uri:
                        'https://static.heart.co.uk/assets_v4r/heart/img/favicon-196x196.png',
                    }
              }
              style={styles.image}
            />
            <View style={styles.textWrap}>
              <Text style={styles.stationName}>{station.name}</Text>
              {sleepTime > 0 && (
                <View style={styles.sleepWrap}>
                  <Badge style={styles.badge}>
                    <FontAwesome
                      name="bed"
                      size={13}
                      color="black"
                      style={styles.sleepIcon}
                    />
                    <Text style={styles.badgeText}>
                      {formatTime(sleepTime)}
                    </Text>
                  </Badge>
                </View>
              )}
            </View>
          </TouchableOpacity>
          <View style={styles.iconWrap}>
            {loadingAudio && (
              <View style={styles.playButton}>
                <ActivityIndicator size={24} color="#00ff00" />
              </View>
            )}
            {!audioPlaying && !loadingAudio && (
              <Button
                style={styles.playButton}
                onPress={handlePlayPress}
                rounded
              >
                <AntDesign name="caretright" size={24} color="black" />
              </Button>
            )}
            {audioPlaying && !loadingAudio && (
              <Button
                style={styles.playButton}
                onPress={handlePausePress}
                iconLeft
              >
                <Ionicons name="pause-sharp" size={24} color="black" />
              </Button>
            )}
          </View>
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
    marginBottom: 2,
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
  sleepIcon: {
    alignSelf: 'center',
    marginRight: 5,
  },
  iconWrap: {
    marginLeft: 'auto',
    flexDirection: 'row',
  },
  textWrap: {
    alignSelf: 'center',
  },
  sleepWrap: {
    flexDirection: 'row',
  },
  badgeText: {
    fontSize: 11,
    padding: 0,
    marginLeft: 2,
  },
  badge: {
    maxHeight: 20,
    backgroundColor: 'rgba(0,0,0,0.15)',
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default MusicTabBar;
