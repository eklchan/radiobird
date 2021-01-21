import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import PlayerScreen from './screens/PlayerScreen';
import MainStackScreen from './navigation/navigation';
import { createStackNavigator } from '@react-navigation/stack';
import { useUrl } from './Context';
import { StyleSheet, Share, View } from 'react-native';
import { Ionicons, Entypo, MaterialCommunityIcons } from '@expo/vector-icons';
import { Button, Text, Picker, Icon } from 'native-base';
import SetLocationScreen from './screens/SetLocationScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import DropDownPicker from 'react-native-dropdown-picker';

const RootStack = createStackNavigator();

const RootNavigation = () => {
  const station: any = useUrl();
  const [localStorageRadio, setLocalStorageRadio] = useState({});
  // const [menuVisible, setMenuVisible] = useState(false);

  const handleSharePress = async () => {
    try {
      const result = await Share.share({
        message: `I am listening to ${station.name} using RadioBird! `,
      });
    } catch (error) {
      console.log(error, 'SHARE PRESS');
    }
  };

  useEffect(() => {
    let response;
    const localData = async () => {
      const getData = async () => {
        try {
          const jsonValue = await AsyncStorage.getItem('countryRadio');
          return jsonValue != null ? JSON.parse(jsonValue) : null;
        } catch (e) {
          console.log(e, 'ERROR');
        }
      };
      response = await getData();
      console.log(response, 'DATA');
      setLocalStorageRadio(response);
    };
    localData();
  });

  return (
    <NavigationContainer>
      <RootStack.Navigator>
        {localStorageRadio ? (
          <>
            <RootStack.Screen
              name="Main"
              component={MainStackScreen}
              options={{ headerShown: false }}
            />
            <RootStack.Screen
              name="Player"
              component={PlayerScreen}
              options={{
                title: `${station && station.name}`,
                headerRight: () => {
                  return (
                    <View style={styles.iconsContainer}>
                      <Button style={styles.buttonsContainer} transparent>
                        <MaterialCommunityIcons
                          name="alarm-plus"
                          size={24}
                          color="black"
                        />
                      </Button>
                      <Button
                        onPress={handleSharePress}
                        style={styles.buttonsContainer}
                        transparent
                      >
                        <Ionicons name="share-social" size={24} color="black" />
                      </Button>
                      {/* <TouchableWithoutFeedback
                        onPress={() => setMenuVisible(false)}
                        style={styles.touchable}
                      >
                        <View style={styles.modalOverlay} />
                      </TouchableWithoutFeedback>
                      <DropDownPicker
                        items={[
                          { label: 'USA', value: 'usa', hidden: true },
                          { label: 'UK', value: 'uk' },
                          { label: 'France', value: 'france' },
                        ]}
                        containerStyle={{
                          width: 120,
                          position: 'absolute',
                          top: 20,
                        }}
                        isVisible={menuVisible}
                        style={{ display: 'none' }}
                        itemStyle={{
                          justifyContent: 'flex-start',
                        }}
                        dropDownStyle={{ backgroundColor: '#fafafa' }}
                      /> */}
                      {/* <Button
                        style={styles.buttonsContainer}
                        // onPress={() => setMenuVisible(true)}
                        transparent
                      >
                        <Entypo
                          name="dots-three-vertical"
                          size={22}
                          color="black"
                        />
                      </Button> */}
                    </View>
                  );
                },
              }}
            />
          </>
        ) : (
          <RootStack.Screen
            name="RadioBird"
            component={SetLocationScreen}
            options={{ headerTitle: 'RadioBird' }}
          />
        )}
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigation;

const styles = StyleSheet.create({
  buttonsContainer: {
    marginRight: 8,
    width: 40,
    height: 40,
    justifyContent: 'center',
  },
  iconsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
});
