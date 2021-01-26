import React, { useState, useEffect, FunctionComponent } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  Modal,
} from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import {
  getFavourites,
  deleteAllFavourties,
} from '../utils/localStorageFavourites';
import { Button, Spinner } from 'native-base';
import { useUrlUpdate } from '../Context';
import {
  useFonts,
  Lato_900Black,
  Lato_700Bold,
  Lato_400Regular,
} from '@expo-google-fonts/lato';
import ListItemCard from '../components/ListItemCard';
import { useIsFocused } from '@react-navigation/native';

type FavouritesScreenProps = {
  setDeleteModal: Function;
  deleteModal: boolean;
};

const FavouritesScreen: FunctionComponent<FavouritesScreenProps> = ({
  deleteModal,
  setDeleteModal,
}) => {
  const setStation: Function = useUrlUpdate();
  const [favouritesArray, setFavouritesArray] = useState([]);
  const isFocused = useIsFocused();

  let [fontsLoaded] = useFonts({
    Lato_900Black,
    Lato_700Bold,
    Lato_400Regular,
  });

  useEffect(() => {
    const fetchData = async () => {
      const storageResponse = await getFavourites();
      setFavouritesArray(storageResponse);
    };
    fetchData();
  }, [isFocused]);

  const handleSetStation = (station: object) => {
    setStation(station);
  };

  const handleHideModal = () => {
    setDeleteModal(false);
  };

  const handleDeleteFavourites = async () => {
    const deleteResponse = await deleteAllFavourties();
    if (deleteResponse) {
      setDeleteModal(false);
      setFavouritesArray([]);
    }
  };

  const renderFavouritesList = favouritesArray.map((station) => {
    return (
      <TouchableOpacity
        key={station.stationuuid}
        onPress={() => handleSetStation(station)}
      >
        <ListItemCard station={station} />
      </TouchableOpacity>
    );
  });

  if (!fontsLoaded) {
    return <Spinner style={styles.loadingSpinner} />;
  } else {
    return (
      <>
        {favouritesArray.length > 0 ? (
          <ScrollView
            style={styles.container}
            showsVerticalScrollIndicator={false}
          >
            <View>{renderFavouritesList}</View>
            <Modal
              animationType="fade"
              transparent={true}
              visible={deleteModal}
            >
              <TouchableWithoutFeedback onPress={handleHideModal}>
                <View style={styles.modalOverlay} />
              </TouchableWithoutFeedback>
              <View style={styles.centeredView}>
                <View style={styles.modalView}>
                  <Text style={styles.modalText}>Delete All Favourites</Text>
                  <Text style={styles.modalText2}>Are you sure?</Text>
                  <View style={styles.modalButtonsWrap}>
                    <Button
                      style={styles.cancelButton}
                      onPress={handleHideModal}
                      bordered
                    >
                      <Text style={styles.modalButtonText}>CANCEL</Text>
                    </Button>
                    <Button
                      style={styles.yesClearButton}
                      onPress={handleDeleteFavourites}
                    >
                      <Text style={styles.modalButtonText2}>DELETE ALL</Text>
                    </Button>
                  </View>
                </View>
              </View>
            </Modal>
          </ScrollView>
        ) : (
          <Text style={styles.noStationsFavourited}>
            No Stations Favourited
          </Text>
        )}
      </>
    );
  }
};

export default FavouritesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    marginHorizontal: 12,
  },

  title: {
    fontSize: 18,
    fontFamily: 'Lato_900Black',
    marginBottom: 15,
  },
  loadingSpinner: {
    alignSelf: 'center',
    marginTop: 10,
  },
  modalOverlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 2,
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 30,
    paddingTop: 20,
    width: 320,
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
  modalButtonsWrap: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  modalText: {
    alignSelf: 'center',
    fontSize: 19,
    marginBottom: 1,
    fontFamily: 'Lato_700Bold',
  },
  modalButtonText: {
    fontSize: 15,
    padding: 11,
    color: 'grey',
    fontFamily: 'Lato_700Bold',
  },
  modalButtonText2: {
    fontSize: 15,
    padding: 11,
    color: '#f0f0f0',
    fontFamily: 'Lato_700Bold',
  },
  cancelButton: {
    borderRadius: 10,
    borderColor: 'grey',
  },
  yesClearButton: {
    borderRadius: 10,
  },
  noStationText: {
    marginTop: 30,
    fontSize: 18,
    alignSelf: 'center',
  },
  modalText2: {
    alignSelf: 'center',
    fontSize: 19,
    marginBottom: 15,
    fontFamily: 'Lato_400Regular',
  },
  noStationsFavourited: {
    fontSize: 19,
    fontFamily: 'Lato_700Bold',
    alignSelf: 'center',
    marginTop: 30,
  },
});
