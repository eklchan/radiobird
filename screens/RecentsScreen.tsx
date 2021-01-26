import { Button, Spinner } from 'native-base';
import React, { useEffect, useState } from 'react';
import {
  Text,
  FlatList,
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  Modal,
} from 'react-native';
import { getRecents, clearAllRecents } from '../utils/localStorageRecents';
import { useIsFocused } from '@react-navigation/native';
import ListItemCard from '../components/ListItemCard';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useUrlUpdate } from '../Context';

const RecentsScreen = () => {
  const [recentListensArray, setRecentListensArray] = useState<object[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [loadingState, setLoadingState] = useState(true);
  const isFocused = useIsFocused();
  const setStation = useUrlUpdate();

  useEffect(() => {
    const fetchRecents = async () => {
      let recentListens = await getRecents();
      recentListens = recentListens.slice(0, 10);
      setRecentListensArray(recentListens);
      setLoadingState(false);
    };
    if (isFocused) {
      fetchRecents();
    }
  }, [isFocused]);

  const handleStationPress = async (clickedStation: object) => {
    await setStation(clickedStation);
  };

  const handleClearButton = () => {
    setModalVisible(true);
  };

  const handleHideModal = () => {
    setModalVisible(false);
  };

  const handleClearAll = async () => {
    const clearResponse = await clearAllRecents();
    if (clearResponse === true) {
      setModalVisible(false);
      setRecentListensArray([]);
    }
  };
  if (loadingState) {
    return <Spinner style={styles.loadingSpinner} />;
  } else {
    return (
      <View style={styles.container}>
        {recentListensArray.length > 0 ? (
          <>
            <FlatList
              ListHeaderComponent={
                <Button
                  style={styles.clearAllButton}
                  onPress={handleClearButton}
                >
                  <Text style={styles.buttonText}>Clear All</Text>
                </Button>
              }
              maxToRenderPerBatch={5}
              initialNumToRender={5}
              removeClippedSubviews={true}
              showsVerticalScrollIndicator={false}
              data={recentListensArray}
              renderItem={({ item }) => (
                <TouchableOpacity onPress={() => handleStationPress(item)}>
                  <ListItemCard station={item} />
                </TouchableOpacity>
              )}
              keyExtractor={(item) => item.stationuuid}
            />
            <Modal
              animationType="fade"
              transparent={true}
              visible={modalVisible}
            >
              <TouchableWithoutFeedback onPress={handleHideModal}>
                <View style={styles.modalOverlay} />
              </TouchableWithoutFeedback>
              <View style={styles.centeredView}>
                <View style={styles.modalView}>
                  <Text style={styles.modalText}>Are you sure?</Text>
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
                      onPress={handleClearAll}
                    >
                      <Text style={styles.modalButtonText2}>CLEAR ALL</Text>
                    </Button>
                  </View>
                </View>
              </View>
            </Modal>
          </>
        ) : (
          <Text style={styles.noStationText}>
            No Stations Recently Listened
          </Text>
        )}
      </View>
    );
  }
};

export default RecentsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    marginHorizontal: 10,
  },
  clearAllButton: {
    alignSelf: 'center',
    borderRadius: 10,
    marginVertical: 24,
  },
  buttonText: {
    fontSize: 22.5,
    padding: 22,
    color: '#ebebeb',
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
    marginBottom: 15,
  },
  modalButtonText: {
    fontSize: 15,
    padding: 11,
    color: 'grey',
  },
  modalButtonText2: {
    fontSize: 15,
    padding: 11,
    color: '#f0f0f0',
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
  loadingSpinner: {
    alignSelf: 'center',
    marginTop: 10,
  },
});
