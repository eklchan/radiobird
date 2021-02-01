import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ActivityIndicator,
  Modal,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import {
  useUrl,
  useHandlePlayContext,
  useHandlePauseContext,
  useAudioPlayingContext,
  useLoadingContext,
  useSleepTimeContext,
  useSetSleepTimeContext,
} from '../Context';
import {
  AntDesign,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from '@expo/vector-icons';
import { Badge, Button, Spinner } from 'native-base';
import { formatTime } from '../utils/utils';
import {
  addToFavourites,
  favouritedOrNot,
  deleteFromFavourites,
} from '../utils/localStorageFavourites';
import {
  useFonts,
  Lato_900Black,
  Lato_700Bold,
  Lato_400Regular,
} from '@expo-google-fonts/lato';
import * as Linking from 'expo-linking';
const Logo = require('../assets/radioIcon.png');

const PlayerScreen = () => {
  const station: any = useUrl();
  const loadingAudio: boolean = useLoadingContext();
  const handlePauseSound: Function = useHandlePauseContext();
  const handlePlaySound: Function = useHandlePlayContext();
  const audioPlaying: boolean = useAudioPlayingContext();
  const setSleepTime: Function = useSetSleepTimeContext();
  const sleepTime: number = useSleepTimeContext();

  const [modalVisible, setModalVisible] = useState(false);
  const [favourited, setFavourited] = useState(false);
  const [imageSource, setImageSource] = useState(station.favicon);
  let [fontsLoaded] = useFonts({
    Lato_900Black,
    Lato_700Bold,
    Lato_400Regular,
  });

  const uniqueTags: Array<string> = Array.from(
    new Set(station.tags.split(',')),
  );

  useEffect(() => {
    const fetchData = async () => {
      const storageResponse = await favouritedOrNot(station);
      if (storageResponse) {
        setFavourited(true);
      } else {
        setFavourited(false);
      }
    };
    fetchData();
  }, [station]);

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

  const handleStarPress = async () => {
    const storageResponse = await favouritedOrNot(station);
    if (!storageResponse) {
      await addToFavourites(station);
      setFavourited(true);
    } else {
      await deleteFromFavourites(station);
      setFavourited(false);
    }
  };

  const handleShowModal = () => {
    setModalVisible(true);
  };

  const handleHideModal = () => {
    setModalVisible(false);
  };

  const handleTimerAdd = (seconds: number) => {
    setSleepTime(sleepTime + seconds);
  };

  const handleTimerDisable = () => {
    setSleepTime(-1);
  };

  const handleHomepagePress = () => {
    Linking.openURL(station.homepage);
  };

  if (!fontsLoaded) {
    return <Spinner />;
  } else {
    return (
      <View style={styles.container}>
        {!!station.homepage && (
          <Button
            style={styles.homepageVisitButton}
            transparent
            onPress={handleHomepagePress}
          >
            <Text style={styles.visitHomepageText}>Visit Station Homepage</Text>
            <MaterialIcons name="navigate-next" size={19} color="black" />
          </Button>
        )}
        <Image
          source={station.favicon ? { uri: `${imageSource}` } : Logo}
          onError={() => setImageSource('')}
          key={station.name}
          style={styles.image}
        />
        <Text style={styles.stationName}>{station.name}</Text>
        <View style={styles.tagContainer}>{renderTags}</View>
        <Text style={styles.countryText}>{station.country}</Text>
        <View style={styles.languageContainer}>{renderLanguages}</View>
        {station.bitrate > 0 && <Text>{station.bitrate} kbps</Text>}
        <View style={styles.buttonContainers}>
          <TouchableOpacity onPress={handleStarPress}>
            {favourited ? (
              <AntDesign
                name="star"
                size={26}
                color="black"
                style={styles.starIcon}
              />
            ) : (
              <AntDesign
                name="staro"
                size={26}
                color="black"
                style={styles.starIcon}
              />
            )}
          </TouchableOpacity>
          {audioPlaying && !loadingAudio && (
            <Button
              style={styles.playPauseButton}
              onPress={handlePausePress}
              rounded
            >
              <Ionicons
                name="pause-sharp"
                size={26}
                color="black"
                style={styles.playPauseIcon}
              />
            </Button>
          )}
          {!audioPlaying && !loadingAudio && (
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
          <TouchableOpacity onPress={handleShowModal}>
            <MaterialCommunityIcons
              name="sleep"
              size={24}
              color="black"
              style={styles.sleepIcon}
            />
          </TouchableOpacity>
        </View>
        <Modal animationType="fade" transparent={true} visible={modalVisible}>
          <TouchableWithoutFeedback onPress={handleHideModal}>
            <View style={styles.modalOverlay} />
          </TouchableWithoutFeedback>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              {sleepTime > 0 ? (
                <Text style={styles.modalText}>
                  {' '}
                  Time Remaining: {formatTime(sleepTime)}
                </Text>
              ) : (
                <Text style={styles.modalText}>No Sleep Timer Set</Text>
              )}
              <TouchableOpacity
                style={{ ...styles.openButton }}
                onPress={() => handleTimerAdd(10)}
              >
                <Text style={styles.modalSubText}>Add 1 Minute</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{ ...styles.openButton }}
                onPress={() => handleTimerAdd(300)}
              >
                <Text style={styles.modalSubText}>Add 5 Minutes</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{ ...styles.openButton }}
                onPress={() => handleTimerAdd(900)}
              >
                <Text style={styles.modalSubText}>Add 15 Minutes</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{ ...styles.openButton }}
                onPress={handleTimerDisable}
              >
                <Text style={styles.modalSubText}>Disable Sleep Timer</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
        {sleepTime > 0 && (
          <Badge style={styles.sleepBadge}>
            <Text style={styles.sleepBadgeText}>
              Sleep Timer: {formatTime(sleepTime)}
            </Text>
          </Badge>
        )}
      </View>
    );
  }
};

export default PlayerScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 15,
  },

  image: {
    height: 160,
    width: 160,
    position: 'relative',
    bottom: 20,
  },
  tagText: {
    textTransform: 'capitalize',
    padding: 3,
  },
  tagContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginVertical: 5,
    marginHorizontal: 10,
  },
  badges: {
    margin: 5,
    padding: 2,
    backgroundColor: 'rgba(0,0,0,0.15)',
  },
  countryText: {
    textAlign: 'center',
    marginVertical: 2,
    fontFamily: 'Lato_400Regular',
    fontSize: 15,
  },
  languageText: {
    textTransform: 'capitalize',
    marginVertical: 2,
    fontFamily: 'Lato_400Regular',
    fontSize: 14,
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
  playPauseIcon: {},
  buttonContainers: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: '90%',
    marginVertical: 30,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 5,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 30,
    width: 340,
    alignItems: 'flex-start',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  openButton: {
    padding: 12,
    elevation: 2,
  },
  modalOverlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  modalText: {
    padding: 12,
    fontSize: 18,
  },
  modalSubText: {
    fontSize: 16,
  },
  stationName: {
    fontFamily: 'Lato_700Bold',
    fontSize: 21,
    marginVertical: 10,
  },
  sleepBadge: {
    position: 'absolute',
    bottom: 100,
    alignSelf: 'center',
    backgroundColor: 'rgba(0,0,0,0.15)',
  },
  sleepBadgeText: {
    padding: 10,
    fontFamily: 'Lato_400Regular',
  },
  sleepIcon: {
    padding: 3,
  },
  starIcon: {
    padding: 3,
  },
  homepageVisitButton: {
    position: 'absolute',
    top: 0,
    right: 0,
    flexDirection: 'row',
  },
  visitHomepageText: {
    fontSize: 14,
    fontFamily: 'Lato_400Regular',
  },
});
