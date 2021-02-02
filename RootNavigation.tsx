import React, { useEffect, useState } from 'react';
import PlayerScreen from './screens/PlayerScreen';
import MainStackScreen from './navigation/navigation';
import { createStackNavigator } from '@react-navigation/stack';
import { useUrl } from './Context';
import { StyleSheet, Share, View } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Button } from 'native-base';
import SetLocationScreen from './screens/SetLocationScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AddAlarmScreen from './screens/AddAlarmScreen';

const RootStack = createStackNavigator();

const RootNavigation = () => {
  const station: any = useUrl();
  const [localStorageRadio, setLocalStorageRadio] = useState({});

  const handleSharePress = async () => {
    try {
      const result = await Share.share({
        message: `I am listening to ${station.name} using RadioBird! `,
      });
      console.log(result, 'SHARE');
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
      setLocalStorageRadio(response);
    };
    localData();
  });

  return (
    <>
      <RootStack.Navigator>
        <RootStack.Screen
          name="Main"
          component={MainStackScreen}
          options={{ headerShown: false }}
        />
        <RootStack.Screen
          name="Player"
          component={PlayerScreen}
          options={({ navigation }) => ({
            title: `${station && station.name}`,
            headerRight: () => {
              return (
                <View style={styles.iconsContainer}>
                  <Button
                    style={styles.buttonsContainer}
                    onPress={() => navigation.navigate('addAlarm')}
                    transparent
                  >
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
                </View>
              );
            },
          })}
        />
        <RootStack.Screen
          name="addAlarm"
          component={AddAlarmScreen}
          options={{ headerTitle: 'Add An Alarm' }}
        />
      </RootStack.Navigator>
    </>
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
